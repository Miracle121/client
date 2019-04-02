import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Auth } from './auth.modole';
import { environment } from "../../environments/environment";
const URL_API = environment.API_URL +"auth";
@Injectable({
  providedIn: 'root'
})
export class AutService {
  private token: string;
  private isAuthentificated = false;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {
  }
  getToken() {
    return this.token;
  }
  getIsAuthentificate() {
    return this.isAuthentificated;
  }
   getAuthStatusListener() {
   return this.authStatusListener.asObservable();
   }
  getUserId(){
     return this.userId;
   }
  createauth(firstname: string, secondname: string, username: string, email: string, password: string) {
      const authdata: Auth = { firstname, secondname, username, email, password };
    this.http.post( URL_API, authdata)
    .subscribe(result => {
      console.log(result);
    });
  }
  loginauth(email: string, password: string) {
    const logindata: Auth = { email, password };
    this.http.post<{ token: string, expiresIn: number, userId: string }>(URL_API+"/login", logindata)
      .subscribe(respons => {
        const token = respons.token;
        this.token = token;
        if (token) {
          const ExpiresDuration = respons.expiresIn;
          this.setTimer(ExpiresDuration);
          this.isAuthentificated = true;
          this.userId = respons.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + ExpiresDuration * 1000);
          this.saveAuthData(token, expirationDate,this.userId);
          this.router.navigate(['/']);
        }
      });
}
autoAuth() {
  const authInfo = this.getAuthData();
  if( ! authInfo ) {
   return;
 }
  const now = new Date();
  const expiresIn = authInfo.expiration.getTime() - now.getTime();
  if(expiresIn > 0)
  {
   this.token = authInfo.token;
   this.isAuthentificated = true;
   this.userId = authInfo.userId;
   this.setTimer(expiresIn / 1000);
   this.authStatusListener.next(true);
 }
}
logout() {
  this.token = null;
  this.isAuthentificated = false;
  this.authStatusListener.next(false);
  this.userId =null;
  this.cleareAuthData();
  this.router.navigate(['/login']);
  clearTimeout(this.tokenTimer);
}
private setTimer(durition: number){
  console.log("set timer "+ durition);
  this.tokenTimer = setTimeout(() => {
    this.logout();
  }, durition * 1000);
}
private saveAuthData(token: string , expirationDate: Date, userId: string) {
  localStorage.setItem('token', token);
  localStorage.setItem('expiration', expirationDate.toISOString());
  localStorage.setItem('userId',  userId);
}
private cleareAuthData() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  localStorage.removeItem('userId');
}
private getAuthData() {
  const token = localStorage.getItem('token');
  const expirationDate = localStorage.getItem('expiration');
  const userId = localStorage.getItem('userId');
  if (!token || !expirationDate) {
    return;
  }
  return {
    token : token,
    expiration : new Date(expirationDate),
    userId : userId
  };
}
}
