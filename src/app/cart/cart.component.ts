import { Component,ElementRef, OnInit, ViewChild, Input, HostListener, NgZone  } from '@angular/core';
import { Item } from '../item.entity';
import {MatDialog} from '@angular/material/dialog';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent  implements OnInit {


  public items: Item[] = [];
  public items2: Item[] = [];
  public total: number = 0;

  
  
  HideCart;
  HideButton;
  empty_message;


  latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  private geoCoder;

 
  @ViewChild('search',{static: false})
  public searchElementRef: ElementRef;
 

  constructor(public dialog: MatDialog, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone ) { }








  @Input() amount;
  @Input() description;

  



  ngOnInit() {

   
    this.setCurrentLocation();



        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
          this.setCurrentLocation();
          this.geoCoder = new google.maps.Geocoder;
    
          let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
              //get the place result
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    
              //verify result
              if (place.geometry === undefined || place.geometry === null) {
                return;
              }
    
              //set latitude, longitude and zoom
              this.latitude = place.geometry.location.lat();
              this.longitude = place.geometry.location.lng();
              this.zoom = 12;
            });
          });
        });





////////////////////

    
    let cart = JSON.parse(localStorage.getItem('cart'));

    this.HideCart=true;
    this.HideButton=true;
    
    if (cart.length>0)
    {
      this.HideCart=false;
      this.HideButton=false;
    }

    this.empty_message=true;
    if (cart.length==0)
      this.empty_message=false;


    this.loadCart();

   
  }


  

  changed(e,value,id){
    
    console.log( value + "    " + id);
    let cart: any = JSON.parse(localStorage.getItem('cart'));


    this.items2 = [];  

    for (var i = 0; i < cart.length; i++) {//
     let item2 = JSON.parse(cart[i]);
     this.items2.push({
       product: item2.product,
       quantity: item2.quantity
     });
    
     if (item2.product.id == id) { //update quantity
      let item: Item = JSON.parse(cart[i]);
        item.quantity = value;
        cart[i] = JSON.stringify(item);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
     
    }  

    this.loadCart();

}





  loadCart() {
    this.total = 0;
    this.items = [];
    
    
    let cart = JSON.parse(localStorage.getItem('cart'));

    if ( (localStorage.getItem('cart') != null)) {  // if cart is not empty then proceed
    for (var i = 0; i < cart.length; i++) {//
      let item = JSON.parse(cart[i]);
      this.items.push({
        product: item.product,
        quantity: item.quantity
      });  
      this.total += (item.product.price.price) * item.quantity;
    }//
  }
    
  }

  remove(id: string): void {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    
    /*
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product.id == id) {
				cart.splice(i, 1);
				break;
			}
    }
    */


   this.items2 = [];  // start new function, dumping cart content into new array called items3

   for (var i = 0; i < cart.length; i++) {//
    let item2 = JSON.parse(cart[i]);
    this.items2.push({
      product: item2.product,
      quantity: item2.quantity
    });
   
    if (item2.product.id == id) {
     cart.splice(i, 1);
     break;
   }
    
   }      // end new function
    



   if(cart.length==0)
    location.reload();


		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
	}



  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }


 

  
}







