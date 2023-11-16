import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    window.location.href = '/sign-in';
    return false;
  } else {
    return true;
  }
};
