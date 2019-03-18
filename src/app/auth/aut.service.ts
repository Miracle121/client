import { Injectable } from '@angular/core';
import { Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import{Auth} from './auth.modul';
@Injectable({
  providedIn: 'root'
})
export class AutService {
  constructor(private http: HttpClient, private router: Router) {
  }

  createauth(firstname: string, secondname: string, username: string, email: string, password: string) {
      const authdata : Auth = { firstname:firstname,secondname:secondname,username:username,email:email, password :password };
     // console.log(authdata);
    this.http.post("http://localhost:3000/api/auth", authdata)
    .subscribe(result=>{
      console.log(result);
    });


  }



}
