import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {filter} from 'rxjs/operators';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Item } from '../item.entity';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$: Object;

  private items: Item[] = [];
	private total: number = 0;

 currentUrl: string;
 constructor(private router: Router, private data: DataService) {
  this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((_: NavigationEnd) => { this.currentUrl = _.url; });
 }

  ngOnInit() {

    this.data.getAllProducts().subscribe(
      data => this.products$ = data
    );

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
      this.total += item.product.price * item.quantity;
    }//
  }
    
  }



  AddToCart(name, product,id) {
    


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
      for (var i = 0; i < cart.length; i++) {
        let item: Item = JSON.parse(cart[i]);
        console.log(item.product.id); const peopleArray = Object.values(product)
        if (item.product.id == id) {    // potential issue here
          index = i;
          break;
        }
      }
      if (index == -1) {
        cart.push(JSON.stringify(item));
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        let item: Item = JSON.parse(cart[index]);
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
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product.id == id) {
				cart.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
	}



 
  

}
