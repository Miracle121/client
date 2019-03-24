import { Component, OnInit } from '@angular/core';
import { Users} from './users/users.modul';
import { AutService } from './auth/aut.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authser : AutService) {
  }
  ngOnInit() {
      this.authser.autoAuth();
  }
}
