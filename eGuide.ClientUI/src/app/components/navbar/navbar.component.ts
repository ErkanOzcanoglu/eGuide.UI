import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { WebsiteService } from 'src/app/services/website.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  navbar?: number;
  user: User = new User();
  isLoggedIn = false;
  showUserMenu = false;
  hamburgerMenu = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private websiteService: WebsiteService
  ) {}

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
    this.getNavbarType();
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('brand');
    localStorage.removeItem('vehicleId');
    location.reload();
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings']);
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  toggleHamburgerMenu() {
    this.hamburgerMenu = !this.hamburgerMenu;
    console.log(this.hamburgerMenu);
  }

  getNavbarType() {
    this.websiteService.getWebsite().subscribe((website) => {
      this.navbar = website[0].navbar;
    });
  }
}
