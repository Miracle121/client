import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Auth } from './auth.modul';
@Injectable({
  providedIn: 'root'
})
export class AutService {
  private token: string;
  private isAuthentificated = false;
  private tokenTimer: any;
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
  createauth(firstname: string, secondname: string, username: string, email: string, password: string) {
      const authdata: Auth = { firstname, secondname, username, email, password };
      this.http.post('http://localhost:3000/api/auth', authdata)
    .subscribe(result => {
      console.log(result);
    });
  }
  loginauth(email: string, password: string) {
    const logindata: Auth = { email, password };
    this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/api/auth/login', logindata)
      .subscribe(respons => {
        const token = respons.token;
        this.token = token;
        if (token) {
          const ExpiresDuration = respons.expiresIn;
          this.setTimer(ExpiresDuration);
          this.isAuthentificated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + ExpiresDuration * 1000);
          this.saveAuthData(token, expirationDate);
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
   this.setTimer(expiresIn / 1000);
   this.authStatusListener.next(true);
 }
}

logout() {
  this.token = null;
  this.isAuthentificated = false;
  this.authStatusListener.next(false);
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
private saveAuthData(token: string , expirationDate: Date) {
localStorage.setItem('token', token);
localStorage.setItem('expiration', expirationDate.toISOString());
}
private cleareAuthData() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
}
private getAuthData() {
  const token = localStorage.getItem('token');
  const expirationDate = localStorage.getItem('expiration');
  if (!token || !expirationDate) {
    return;
  }
  return {
    token,
    expiration: new Date(expirationDate)
  };

}
}
