import { Component, OnInit } from '@angular/core';
import { SocialMedia } from 'src/app/models/social-media';
import { SocialMediaService } from 'src/app/services/social-media.service';
import { WebsiteService } from 'src/app/services/website.service';
import { ColorHelper } from '../generic-helper/color/color-helper';
import { ThemeColor } from 'src/app/models/color';
import { Store } from '@ngrx/store';
import { selectThemeData } from 'src/app/state/theme-state/theme.selector';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [ColorHelper],
})
export class FooterComponent implements OnInit {
  socialMedias: SocialMedia[] = [];
  footer?: number;
  color: ThemeColor = new ThemeColor();
  theme$ = this.store.select(selectThemeData);

  constructor(
    private socialMediaService: SocialMediaService,
    private websiteService: WebsiteService,
    private colorHelper: ColorHelper,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getSocialMedias();
    this.getFooterType();
    this.getColor();
    // this.store.select(selectThemeData).subscribe((theme) => {
    this.theme$.subscribe(() => {
      this.colorHelper.getColors();
      this.colorHelper.getLocalColors(this.color);
    });
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
