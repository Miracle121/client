import { Component, OnInit, OnDestroy } from '@angular/core';
import {Users} from '../users.model';
import {UsersService} from './../users.service';
import { Subscription } from 'rxjs';
import { AutService } from '../../auth/aut.service';
@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit, OnDestroy {
  userIsAuthenticade = false;
  posts: Users[] = [];
  userId:string;
  private Subscrpt: Subscription;
  private authLisenerSubs: Subscription;

  constructor(public userService: UsersService, private authservice: AutService) {   }
  ngOnInit() {
   this.userService.getUsers();
   this.userId = this.authservice.getUserId();
   this.Subscrpt = this.userService.getUpdateUserslisner().subscribe((user: Users[]) => {
      this.posts = user;
    });
   this.userIsAuthenticade = this.authservice.getIsAuthentificate();
   this.authLisenerSubs= this.authservice
   .getAuthStatusListener()
   .subscribe(isAuthenticated => {
     this.userId = this.authservice.getUserId();
     this.userIsAuthenticade =isAuthenticated;
      });
    }
    onDelete(postId: string){
        this.userService.DeletePost(postId);
    }
    ngOnDestroy(){
      this.authLisenerSubs.unsubscribe();
    }
}
