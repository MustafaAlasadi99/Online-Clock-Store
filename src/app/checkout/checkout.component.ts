import { Component, OnInit, OnChanges,ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {filter} from 'rxjs/operators';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Item } from '../item.entity';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public total: number = 0;
  public items: Item[] = [];
  public items2: Item[] = [];

  latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  private geoCoder;
  currentUrl: string;


  @ViewChild('search',{static: false})
  public searchElementRef: ElementRef;








  constructor(private router: Router,  private http: HttpClient, private data: DataService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, public dialog: MatDialog) {
   this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((_: NavigationEnd) => { this.currentUrl = _.url; });
  
  }

  openDialog() {
    this.dialog.open(Dialog);
  }

  ngOnInit() {

    this.loadCart();

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
 

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        //this.latitude = position.coords.latitude;
        //this.longitude = position.coords.longitude;
        this.latitude = 37.335480;
        this.longitude = -121.893028;
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


@Component({
  selector: 'dialog2',
  templateUrl: 'dialog.html',
})
export class Dialog {}