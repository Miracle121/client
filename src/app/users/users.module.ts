import{ NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { UsersComponent } from '../users/users.component';
import { UserslistComponent } from '../users/userslist/userslist.component';
import { AngulaMaterialModule } from '../angular-material.module';
import{RouterModule} from '@angular/router';
@NgModule({
  declarations: [

    UsersComponent,
    UserslistComponent
  ],
  imports: [
    CommonModule,
    AngulaMaterialModule,
    ReactiveFormsModule,
    RouterModule
   ],
  exports: [],
  providers: [],
})
export class UserModule {}
