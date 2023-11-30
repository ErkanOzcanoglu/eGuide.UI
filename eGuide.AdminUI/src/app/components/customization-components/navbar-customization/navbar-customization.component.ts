import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Website } from 'src/app/models/website';
import { WebsiteService } from 'src/app/services/website.service';

@Component({
  selector: 'app-navbar-customization',
  templateUrl: './navbar-customization.component.html',
  styleUrls: ['./navbar-customization.component.css'],
})
export class NavbarCustomizationComponent implements OnInit {
  value?: number;
  website: Website[] = [];

  constructor(
    private websiteService: WebsiteService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getNavbarType();
  }

  getNavbarType() {
    this.websiteService.getWebsite().subscribe((website) => {
      this.website = website;
      this.value = this.website[0].navbar;
    });
  }

  onSubmit() {
    this.websiteService.updateNavbar(this.website[0].id, this.value).subscribe(
      () => {
        this.toast.success('Navbar type updated successfully');
      },
      () => {
        this.toast.error('Navbar type update failed');
      }
    );
  }

  navbarType(value: any) {
    this.value = value;
  }
}
