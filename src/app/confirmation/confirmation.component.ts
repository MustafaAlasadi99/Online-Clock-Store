import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  key1: Object;
  Message: String;
  ToUpdate: Object;

  constructor(private http: HttpClient, private data: DataService) { }

  ngOnInit() {
    const array1 = [];
    for (let i = 0; i < localStorage.length; i++) {
      this.key1 = localStorage.key(i);
      const value = localStorage.getItem( this.key1.toString() );
      if (parseFloat(value) < 1 || this.key1.toString() === 'username') {
        continue;
      }
      console.log(value.split(',')[3] , value.split(',')[0]);
      if ( parseFloat(value.split(',')[3]) < parseFloat(value.split(',')[0])) {
        this.Message = 'Sorry, purchase was not completed due to insufficient stock';
        return;
      }
      array1.push({id: value.split(',')[2], value : value.split(',')[0]} );

     }
     this.ToUpdate = array1;


    this.http
    .get<any>('https://user-service1.herokuapp.com/getUserData/' + localStorage.getItem('username'), {observe: 'response'})
    .subscribe(resp => {
      console.log(resp.body.usercredit.amount);
      if (!(parseFloat(resp.body.usercredit.amount) >= parseFloat(localStorage.getItem('totalCost')) )) {
        console.log(resp.body.usercredit.amount, 'yes');
        this.Message = 'Sorry, purchase was not completed due to insufficient funds';
        return;
      }


      this.Message = 'Thank you, Your Purchase was Successful!';
      console.log(this.ToUpdate);
      // Todo: update database here
      // the ToUpdate Object is an array of associative arrays : "id" is the id of the time to update
      //  and "value" is the number being bought.





    });
  }

}
