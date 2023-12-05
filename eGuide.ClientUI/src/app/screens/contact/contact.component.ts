import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ColorHelper } from 'src/app/components/generic-helper/color/color-helper';
import { Color, ThemeColor } from 'src/app/models/color';
import { selectThemeData } from 'src/app/state/theme.selector';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ColorHelper],
})
export class ContactComponent {
  color: ThemeColor = new ThemeColor();

  constructor(
    private colorHelper: ColorHelper,
    private store: Store<{ theme: any }>
  ) {}

  ngOnInit(): void {
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
}
