import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: User = new User();
  isLoggedIn = false;
  showUserMenu = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    const authToken = localStorage.getItem('authToken');
    console.log(authToken);
    if (authToken) {
      const userId = authToken;
      this.userService.getUserById(userId).subscribe((user) => {
        this.user = user;
        this.isLoggedIn = true;
      });
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('brand');
    localStorage.removeItem('vehicleId');
    this.router.navigate(['/login']); 
    
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings']);
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }
}
export class NavbarComponent {}
