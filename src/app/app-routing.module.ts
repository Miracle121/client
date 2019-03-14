import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserslistComponent } from './users/userslist/userslist.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {path:'', component : UserslistComponent},
  {path:'usercreate', component: UsersComponent },
  {path:'edit/:userId',component:UsersComponent},
  {path:'login', component:LoginComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
