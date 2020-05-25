import { Component, OnInit,ViewChild ,OnChanges,ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { DataService } from '../data.service';

import { from } from 'rxjs';
import { Item } from '../item.entity';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

 
  cartno :  number;  

  AddButton : string;
  
  HideSpinner;

  products$ :  Object;

  private items: Item[] = [];
  private items2: Item[] = [];
  private items3: Item[] = [];
  private total: number = 0;
  

  clicked = false;

 currentUrl: string;
 constructor(private router: Router, private data: DataService) {
  this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((_: NavigationEnd) => { this.currentUrl = _.url; });
 }

  ngOnInit() {
    this.HideSpinner=false;

    /*
    this.data.getAllProducts().subscribe(
      data => this.products$ = data  
    );
*/


    this.data.getAllProducts().subscribe(
      response => {
           this.products$ = response;
      },
      err => {
           console.log(err);
           //closeLoadingBar();
      },
      () => { console.log("Complete");
      this.HideSpinner=true;
      }
 );





    this.loadCart();

    
   
 

  }



  loadCart( ) {

    let cart = JSON.parse(localStorage.getItem('cart'));

    this.total = 0;
    this.items = [];

    
   
    this.cartno=0;
    if ( (localStorage.getItem('cart') != null)) {  // if cart is not empty then proceed
    for (var i = 0; i < cart.length; i++) {//
      let item = JSON.parse(cart[i]);
      this.items.push({
        product: item.product,
        quantity: item.quantity
      });
      this.cartno+=item.quantity;
      this.total += item.product.price * item.quantity;
    }//
  }
    








  }



  AddToCart(name, product,id) {
    
    this.AddButton="false";


    var item: Item = {
      product: product,
      quantity: 1
    };

    if (localStorage.getItem('cart') == null) {
      let cart: any = [];
      cart.push(JSON.stringify(item));
      localStorage.setItem('cart', JSON.stringify(cart));
    }


    else {
      let cart: any = JSON.parse(localStorage.getItem('cart'));
      let index: number = -1;


     this.items2 = [];  // start new function, dumping cart content into new array called items2

     
     for (var i = 0; i < cart.length; i++) {//
      let item2 = JSON.parse(cart[i]);
      this.items2.push({
        product: item2.product,
        quantity: item2.quantity
      });
      if ( item2.product.id == id )   
      {    
       index = i;
       break;
     }
      
    }                                               //end new function





      if (index == -1) {
        cart.push(JSON.stringify(item));
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        let item: Item = JSON.parse(cart[index]);
        if(item.quantity<5)
            item.quantity += 1;

        cart[index] = JSON.stringify(item);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }

    this.loadCart();
    
  }

  remove(id: string): void {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    



this.items3 = [];  // start new function, dumping cart content into new array called items3

for (var i = 0; i < cart.length; i++) {//
 let item3 = JSON.parse(cart[i]);
 this.items3.push({
   product: item3.product,
   quantity: item3.quantity
 });

 if (item3.product.id == id) {
  cart.splice(i, 1);
  break;
}
 
}      // end new function


		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
	}


  AddToCartButton(id){

    document.getElementById(id).innerHTML = "Added To Cart";


    document.getElementById(id).style.color = "yellow";

    
  }




}
