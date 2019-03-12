import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserslistComponent } from './users/userslist/userslist.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'', component : UserslistComponent},
  {path:'usercreate', component: UsersComponent },
  {path:'edit/:userId',component:UsersComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
