import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router} from '@angular/router';
  import { Injectable} from '@angular/core';
  import { Observable } from 'rxjs';
import { AutService } from './aut.service';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor( private autservice :AutService,private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state:RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      const isAuth = this.autservice.getIsAuthentificate();
      if(!isAuth){
        this.router.navigate(['/login']);
      }
      return isAuth;


  }

}
