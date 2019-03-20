import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AutService } from '../aut.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authservice: AutService) { }
  ngOnInit() {
  }
  isLoding = false;
  onSiginUp(form: NgForm)
  {
    if(form.invalid) {
      return;
    }
    this.authservice.createauth(
       form.value.firstname,
       form.value.secondname,
       form.value.username,
       form.value.email,
       form.value.password);
  }

}
