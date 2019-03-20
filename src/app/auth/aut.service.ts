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
  private token: string;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {
  }
  getToken(){
    return this.token;
  }

   getAuthStatusListener(){
   return this.authStatusListener.asObservable();
   }
  createauth(firstname: string, secondname: string, username: string, email: string, password: string) {
      const authdata : Auth = { firstname:firstname,secondname:secondname,username:username,email:email, password :password };
     // console.log(authdata);
    this.http.post("http://localhost:3000/api/auth", authdata)
    .subscribe(result=> {

      console.log(result);
    });
  }

  loginauth(email: string, password: string){
    const logindata: Auth = { email: email, password: password };

    this.http.post<{token:string}>("http://localhost:3000/api/auth/login", logindata)
      .subscribe(respons => {
        const token = respons.token;
        this.token= token;
        this.authStatusListener.next(true);

      });

}


}
