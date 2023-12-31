import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColorHelper } from 'src/app/components/generic-helper/color/color-helper';
import { ThemeColor } from 'src/app/models/color';
import { selectThemeData } from 'src/app/state/theme-state/theme.selector';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  providers: [ColorHelper],
})
export class ServiceComponent implements OnInit {
  color: ThemeColor = new ThemeColor();
  selectedTheme$ = this.store.select(selectThemeData);

  constructor(private colorHelper: ColorHelper, private store: Store) {}

  ngOnInit(): void {
    this.colorHelper.getLocalColors(this.color);
    this.selectedTheme$.subscribe(() => {
      this.colorHelper.getColors();
      this.colorHelper.getLocalColors(this.color);
    });
  }
}
