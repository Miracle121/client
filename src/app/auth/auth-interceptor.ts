import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutService } from './aut.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private authservice: AutService){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler){
    const authToken = this.authservice.getToken();
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "miracle " + authToken)
    });

    return next.handle(authRequest);
  };
}
