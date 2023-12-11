import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ColorHelper } from 'src/app/components/generic-helper/color/color-helper';
import { Color, ThemeColor } from 'src/app/models/color';
import { selectThemeData } from 'src/app/state/theme.selector';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [ColorHelper],
})
export class SettingsComponent {
  currentPage = 'user-settings';
  color: ThemeColor = new ThemeColor();

  constructor(
    private colorHelper: ColorHelper,
    public translateService: TranslateService,
    private store: Store<{ theme: any }>
  ) {this.translateService.addLangs(['tr', 'en']);
    this.translateService.setDefaultLang('en'); // Varsayılan dil İngilizce
    this.translateService.use('en'); // Başlangıçta İngilizce olarak kullan}
  }

  ngOnInit(): void {
    this.colorHelper.getLocalColors(this.color);
    this.store.pipe(select(selectThemeData)).subscribe((theme) => {
      setTimeout(() => {
        this.colorHelper.getColors();
        this.colorHelper.getLocalColors(this.color);
      }, 50);
    });
  }

  showPage(page: string) {
    this.currentPage = page;
  }

  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
