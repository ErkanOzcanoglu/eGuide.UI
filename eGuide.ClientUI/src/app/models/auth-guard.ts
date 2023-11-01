import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { ToastrService } from "ngx-toastr";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate() {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.toastr.error('Please login first');
      this.router.navigate(['/']);
      return false;
    }
  }
}