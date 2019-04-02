import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserslistComponent } from './users/userslist/userslist.component';
import { UsersComponent } from './users/users.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'', component : UserslistComponent,canActivate:[AuthGuard]},
  {path:'usercreate', component: UsersComponent ,canActivate:[AuthGuard]},
  {path:'edit/:userId',component:UsersComponent,canActivate:[AuthGuard]},
  { path: 'auth', loadChildren:"./auth/auth-routing.module#AuthModule" }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
