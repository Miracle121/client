import { Component, OnInit, OnDestroy } from '@angular/core';
import {Users} from '../users.modul';
import {UsersService} from './../users.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit, OnDestroy {
  posts: Users[] = [];
  private Subscrpt: Subscription;
  constructor(public userService: UsersService) {   }
  ngOnInit() {
   this.userService.getUsers();
   this.Subscrpt = this.userService.getUpdateUserslisner().subscribe((user: Users[]) => {
      this.posts = user;
    });
    }

    onDelete(postId: string){
        this.userService.DeletePost(postId);
    }
    ngOnDestroy(){
    }
}
