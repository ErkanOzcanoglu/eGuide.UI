import { Component, OnInit } from '@angular/core';
import { ColorHelper } from './color-helper';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
  providers: [ColorHelper],
})
export class ColorComponent implements OnInit {
  constructor(private colorHelper: ColorHelper) {}

  ngOnInit(): void {
    this.colorHelper.getColors();
  }
}
