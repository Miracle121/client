import { Component, OnInit } from '@angular/core';
import { AutService } from '../aut.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public authservice: AutService) { }
  ngOnInit() {
  }
  isLoding = false;

  onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
    this.authservice.loginauth(form.value.email, form.value.password);
  }
}
