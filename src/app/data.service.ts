import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUserInfo(username) {
    return this.http.get('https://user-service1.herokuapp.com/getUserData/' + username) ;
  }

  getAllProducts() {
    return this.http.get('https://products-db1.herokuapp.com/GetAllProducts' ) ;
  }


   getProductById(Product_id) {
    return this.http.get('https://products-db1.herokuapp.com/id/' + Product_id) ;
  }


  WakeUpHeroku() {

    return this.http.get('https://products-db1.herokuapp.com/GetAllProducts' ) ;


}

}
