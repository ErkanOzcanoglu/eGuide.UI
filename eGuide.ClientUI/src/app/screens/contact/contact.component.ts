import { Component } from '@angular/core';
import { ColorHelper } from 'src/app/components/generic-helper/color/color-helper';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ColorHelper],
})
export class ContactComponent {
  color: Color = new Color();
  constructor(private colorHelper: ColorHelper) {}

  ngOnInit(): void {
    this.getColor();
  }

  getColor() {
    this.colorHelper.getLocalColors(this.color);
  }
}
