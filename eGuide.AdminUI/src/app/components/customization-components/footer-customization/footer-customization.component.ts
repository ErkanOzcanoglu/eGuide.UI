import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Website } from 'src/app/models/website';
import { WebsiteService } from 'src/app/services/website.service';

@Component({
  selector: 'app-footer-customization',
  templateUrl: './footer-customization.component.html',
  styleUrls: ['./footer-customization.component.css'],
})
export class FooterCustomizationComponent implements OnInit {
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
      this.value = this.website[0].footer;
    });
  }

  onSubmit() {
    if (this.website[0].id != null && this.value != null) {
      this.websiteService
        .updateFooter(this.website[0].id, this.value)
        .subscribe({
          next: () => {
            this.toast.success('Footer type updated successfully');
          },
          error: () => {
            this.toast.error('Footer type update failed');
          },
        });
    }
  }

  footerType(value: number) {
    this.value = value;
  }
}
