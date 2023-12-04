import { Component, OnInit } from '@angular/core';
import { SocialMedia } from 'src/app/models/social-media';
import { SocialMediaService } from 'src/app/services/social-media.service';
import { WebsiteService } from 'src/app/services/website.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  socialMedias: SocialMedia[] = [];
  footer?: number;

  constructor(
    private socialMediaService: SocialMediaService,
    private websiteService: WebsiteService
  ) {}

  ngOnInit(): void {
    this.getSocialMedias();
    this.getFooterType();
  }

  getSocialMedias() {
    return this.socialMediaService.getSocialMedia().subscribe((data) => {
      this.socialMedias = data;
    });
  }

  getFooterType() {
    this.websiteService.getWebsite().subscribe((website) => {
      this.footer = website[0].footer;
    });
  }
}
