import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserslistComponent } from './users/userslist/userslist.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'', component : UserslistComponent,canActivate:[AuthGuard]},
  {path:'usercreate', component: UsersComponent ,canActivate:[AuthGuard]},
  {path:'edit/:userId',component:UsersComponent,canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'signup',component:SignupComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
