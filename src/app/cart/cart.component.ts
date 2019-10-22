import { Component, OnInit } from '@angular/core';
import { Item } from '../item.entity';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent  implements OnInit {


  public items: Item[] = [];
  public items2: Item[] = [];
	public total: number = 0;

  constructor() { }

  ngOnInit() {
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
    






		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
	}




}
