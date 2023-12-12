import { Component, OnInit } from '@angular/core';
import { SocialMedia } from 'src/app/models/social-media';
import { SocialMediaService } from 'src/app/services/social-media.service';
import { WebsiteService } from 'src/app/services/website.service';
import { ColorHelper } from '../generic-helper/color/color-helper';
import { Color, ThemeColor } from 'src/app/models/color';
import { Store, select } from '@ngrx/store';
import { selectThemeData } from 'src/app/state/theme.selector';
import { Observable } from 'rxjs';
import { selectLanguage } from 'src/app/state/language-state/language.selector';
import { TranslateService } from '@ngx-translate/core';

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
  language$: Observable<string>;
  selectedLanguage = '';

  constructor(
    private socialMediaService: SocialMediaService,
    private websiteService: WebsiteService,
    private colorHelper: ColorHelper,
    private store: Store<{ theme: any }>,
    public translateService: TranslateService
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit(): void {
    this.language$.subscribe((currentState) => {
      this.selectedLanguage = currentState;
      console.log('deneme ngrx search icin', this.selectedLanguage);
      this.translateService.use(this.selectedLanguage);
    });

    this.getSocialMedias();
    this.getFooterType();
    this.getColor();
    this.store.pipe(select(selectThemeData)).subscribe((theme) => {
      setTimeout(() => {
        this.colorHelper.getColors();
        this.colorHelper.getLocalColors(this.color);
      }, 50);
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
