// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   Router,
//   RouterStateSnapshot,
//   UrlTree,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean {
//     const logged = localStorage.getItem('token');

import { CanActivateFn } from '@angular/router';

//     if (logged) {
//       return true;
//     }
//     this.router.navigate(['/login']);
//     return false;
//   }
// }
export const AuthGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');
  //  if token is not set, direct to login page else direct to station
  if (!token) {
    window.location.href = '/sign-in';
    return false;
  } else {
    // window.location.href = '/station';
    return true;
  }
};
