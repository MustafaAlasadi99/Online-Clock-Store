import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../item.entity';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  product$: Object;
  new_number$: number ;
  private items: Item[] = [];
  cartno :  number; 
  AddButton : string;
  private items2: Item[] = [];

  constructor(private route: ActivatedRoute, private data: DataService) {
    this.route.params.subscribe( params => this.product$ = params.id );
 }

  ngOnInit() {

    this.data.getProductById(this.product$).subscribe(
      data => this.product$ = data
    );


    this.loadCart();

  }
 


  loadCart( ) {

    let cart = JSON.parse(localStorage.getItem('cart'));

    
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



  AddToCartButton(id){

    document.getElementById(id).innerHTML = "Added To Cart";
    document.getElementById(id);

    
  }

}
