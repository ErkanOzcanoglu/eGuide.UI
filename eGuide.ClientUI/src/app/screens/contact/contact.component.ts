import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColorHelper } from 'src/app/components/generic-helper/color/color-helper';
import { ThemeColor } from 'src/app/models/color';
import { selectThemeData } from 'src/app/state/theme-state/theme.selector';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ColorHelper],
})
export class ContactComponent implements OnInit {
  color: ThemeColor = new ThemeColor();
  selectedTheme$ = this.store.select(selectThemeData);

  constructor(private colorHelper: ColorHelper, private store: Store) {}

  ngOnInit(): void {
    this.getColor();
    this.selectedTheme$.subscribe(() => {
      this.colorHelper.getColors();
      this.colorHelper.getLocalColors(this.color);
    });
  }

  getColor() {
    this.colorHelper.getLocalColors(this.color);
  }
}
