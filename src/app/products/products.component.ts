import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {filter} from 'rxjs/operators';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$: Object;

 currentUrl: string;
 constructor(private router: Router, private data: DataService) {
  this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((_: NavigationEnd) => { this.currentUrl = _.url; });
 }

  ngOnInit() {

    this.data.getAllProducts().subscribe(
      data => this.products$ = data
    );



  }
  sessionCall(name, price, id, stock) {
    console.log('writing to session');
    const oldname = localStorage.getItem(name);
    if (isNaN(parseFloat(oldname))) {
      localStorage.setItem(name, '1' + ',' +  price.toString() + ',' + id.toString() + ',' + stock.toString());
    } else {
      const newnum = ((parseFloat(oldname.split(',')[0])) + 1);
      localStorage.setItem(name, newnum.toString() + ',' +  price.toString() + ',' + id.toString() +  ',' + stock.toString());
    }

  }

}

