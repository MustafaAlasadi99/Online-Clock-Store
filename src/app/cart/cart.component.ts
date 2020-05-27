import { Component,ElementRef, OnInit, Input, HostListener } from '@angular/core';
import { Item } from '../item.entity';
import {MatDialog} from '@angular/material/dialog';




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


  constructor(public dialog: MatDialog ) { }


  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }


  @Input() amount;
  @Input() description;

  

  confirmation: any;
  loading = false;



  ngOnInit() {
    
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


}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogElementsExampleDialog {}

