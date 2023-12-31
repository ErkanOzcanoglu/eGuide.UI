import { ServiceService } from './../../services/service.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ColorHelper } from '../generic-helper/color/color-helper';
import { ThemeColor } from 'src/app/models/color';
import { Store } from '@ngrx/store';
import { selectThemeData } from 'src/app/state/theme-state/theme.selector';
import { Observable } from 'rxjs';
import { selectLanguage } from 'src/app/state/language-state/language.selector';
export interface Theme {
  theme?: string;
}
@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
  providers: [ColorHelper],
})
export class ServiceListComponent implements OnInit {
  service?: Service[];
  width?: number;
  color = new ThemeColor();
  theme?: Theme;
  language$: Observable<string>;
  selectedTheme$ = this.store.select(selectThemeData);
  selectedLanguage = '';

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getWindowWidth();
  }
  constructor(
    private serviceService: ServiceService,
    private colorHepler: ColorHelper,
    private store: Store
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit(): void {
    this.language$.subscribe((currentState) => {
      this.selectedLanguage = currentState;
      console.log('deneme ngrx liste servisdi', this.selectedLanguage);
      this.getServices(this.selectedLanguage);
    });

    this.selectedTheme$.subscribe((theme) => {
      this.theme = theme;
      this.colorHepler.getColors();
      this.colorHepler.getLocalColors(this.color);
      this.setColor();
    });
  }

  setColor(): void {
    this.colorHepler.getLocalColors(this.color);
    console.log(this.color, 'color');
  }

  getWindowWidth() {
    if (window.innerWidth < 640) {
      this.width = 100;
    } else if (window.innerWidth > 640) {
      this.width = 50;
    }
  }

  getServices(lang: string) {
    this.serviceService.getAllServices(lang).subscribe((data) => {
      this.service = data;
      console.log(this.service);
    });
  }
}
