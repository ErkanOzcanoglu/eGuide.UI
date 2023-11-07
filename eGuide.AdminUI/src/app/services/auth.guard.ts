import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');
  //  if token is not set, direct to login page
  if (!token) {
    window.location.href = '/sign-in';
    return false;
  }
  return true;
};
