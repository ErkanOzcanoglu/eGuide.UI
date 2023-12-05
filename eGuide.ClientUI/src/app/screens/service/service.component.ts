import { Component } from '@angular/core';
import { ColorHelper } from 'src/app/components/generic-helper/color/color-helper';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  providers: [ColorHelper],
})
export class ServiceComponent {
  color: Color = new Color();
  constructor(private colorHelper: ColorHelper) {}

  ngOnInit(): void {
    this.colorHelper.getLocalColors(this.color);
  }
}
