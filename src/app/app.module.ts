import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';
import { HttpClientModule } from '@angular/common/http';
import {Dialog} from './checkout/checkout.component';
import {MatListModule} from '@angular/material/list';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { CartComponent } from './cart/cart.component';
import {MatTableModule} from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { environment } from '../environments/environment';
import {MatCardModule} from '@angular/material/card';
import { AgmCoreModule } from '@agm/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProductsComponent,
    LoginComponent,
    DetailsComponent,
    CheckoutComponent,
    ConfirmationComponent,
    CartComponent,
    
    Dialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatBadgeModule,
    MatSelectModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDbeGVNOdRpyfQP2TcP-gFl9gCmnfShlbk',
      libraries: ['places']
    }),
    MatFormFieldModule,
    MatIconModule,
    
    MatInputModule,
  
    
    
   
    
  ],

  entryComponents: [
    Dialog
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
