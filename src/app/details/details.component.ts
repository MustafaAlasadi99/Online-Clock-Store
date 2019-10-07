import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  product$: Object;
  new_number$: number ;


  constructor(private route: ActivatedRoute, private data: DataService) {
    this.route.params.subscribe( params => this.product$ = params.id );
 }

  ngOnInit() {

    this.data.getProductById(this.product$).subscribe(
      data => this.product$ = data
    );

  }
  sessionCall(name, number, price, id, stock) {

    if ( number === '') {
      number = 1;
    }

    if (number.toString() !== '0' ) {
    console.log('writing to session');
    const oldname = localStorage.getItem(name);
    if (isNaN(parseFloat(oldname))) {

      localStorage.setItem(name, number.toString() + ',' +  price.toString() + ',' + id.toString() + ',' + stock.toString());
    } else {

      this.new_number$ = ((parseFloat(oldname.split(',')[0])) + parseFloat(number));
      localStorage.setItem(name, this.new_number$.toString() + ',' +  price.toString() + ',' + id.toString() + ',' + stock.toString());
    }

  }




  }

}
