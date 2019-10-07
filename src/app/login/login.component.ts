import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  user$: Object;
  message = '' ;

  getUserName(username: string) {




    this.http
    .get<any>('https://user-service1.herokuapp.com/getUserData/' + username, {observe: 'response'})
    .subscribe(resp => {
      console.log(resp.body.username.name);

     if (resp.body.username.name === username ) {
       localStorage.setItem('username', username);
       this.router.navigateByUrl('products' );
     }




    });

    this.message = 'Logging In...' ;

    setTimeout(() => {
        this.message = 'Wrong Password' ;
    },
    2500);



   }



  constructor(private data: DataService, private http: HttpClient,  private router: Router ) { }

  ngOnInit() {


  }

}
