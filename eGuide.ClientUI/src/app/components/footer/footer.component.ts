import { Component, OnInit } from '@angular/core';
import { SocialMedia } from 'src/app/models/social-media';
import { SocialMediaService } from 'src/app/services/social-media.service';
import { WebsiteService } from 'src/app/services/website.service';
import { ColorHelper } from '../generic-helper/color/color-helper';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [ColorHelper],
})
export class FooterComponent implements OnInit {
  socialMedias: SocialMedia[] = [];
  footer?: number;
  color: Color = new Color();

  constructor(
    private socialMediaService: SocialMediaService,
    private websiteService: WebsiteService,
    private colorHelper: ColorHelper
  ) {}

  ngOnInit(): void {
    this.getSocialMedias();
    this.getFooterType();
    this.getColor();
  }

  getColor() {
    this.colorHelper.getLocalColors(this.color);
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
