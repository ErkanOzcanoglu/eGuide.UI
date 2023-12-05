import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ColorHelper } from 'src/app/components/generic-helper/color/color-helper';
import { Color, ThemeColor } from 'src/app/models/color';
import { selectThemeData } from 'src/app/state/theme.selector';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  providers: [ColorHelper],
})
export class ServiceComponent implements OnInit {
  color: ThemeColor = new ThemeColor();

  constructor(
    private colorHelper: ColorHelper,
    private store: Store<{ theme: any }>
  ) {}

  ngOnInit(): void {
    this.colorHelper.getLocalColors(this.color);
    this.store.pipe(select(selectThemeData)).subscribe((theme) => {
      setTimeout(() => {
        this.colorHelper.getColors();
        this.colorHelper.getLocalColors(this.color);
      }, 50);
    });
  }
}
