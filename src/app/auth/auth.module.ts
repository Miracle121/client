import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AngulaMaterialModule } from '../angular-material.module';
import {AuthRoutModule} from './auth-routing.module';
  import { from } from 'rxjs';
@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngulaMaterialModule,
    AuthRoutModule
  ],
  exports: [],
  providers: [],
})
export class AuthModule {}










