import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";
@Injectable()
export class AuthGuard implements CanActivate {
  
    constructor(private auth: AuthService){}
  
  canActivate() {
    if(this.auth.isAuthenticated())
    {
        return true;
    }
    else{
        window.alert('you have no permission')
        return false;
    }
  }
}