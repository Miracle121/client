import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { FormsModule} from '@angular/forms';
import{ ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { from } from 'rxjs';
import { HeaderComponent } from './header/header.component';
import { UserslistComponent } from './users/userslist/userslist.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HeaderComponent,
    UserslistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
