import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutService} from '../auth/aut.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userIsAuthenticade =false;
  private authLisenerSubs: Subscription;
  constructor(private authservice: AutService) { }
  ngOnInit() {
    this.userIsAuthenticade = this.authservice.getIsAuthentificate();
    this.authLisenerSubs = this.authservice
    .getAuthStatusListener()
    .subscribe(isAuthfication=>{
      this.userIsAuthenticade = isAuthfication;
    });
  }

  OnLogout(){
    this.authservice.logout();

  }

  OnDestroy(){
    this.authLisenerSubs.unsubscribe();
  }
}
