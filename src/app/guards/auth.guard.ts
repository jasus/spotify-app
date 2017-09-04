import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private router:Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let response = false;

    if (sessionStorage.getItem('authorization')) {
      response = true;
    }else{
      this.router.navigate(['/login']); //{ queryParams: { returnUrl: state.url }}
    }

    return response;
  }
}
