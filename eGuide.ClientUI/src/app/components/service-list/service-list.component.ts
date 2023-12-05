import { ServiceService } from './../../services/service.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ColorHelper } from '../generic-helper/color/color-helper';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
  providers: [ColorHelper],
})
export class ServiceListComponent implements OnInit {
  service?: Service[];
  width?: number;
  color = new Color();

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getWindowWidth();
  }
  constructor(
    private serviceService: ServiceService,
    private colorHepler: ColorHelper
  ) {}

  ngOnInit(): void {
    this.getServices();
    this.setColor();
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

  getServices() {
    this.serviceService.getAllServices().subscribe((data) => {
      this.service = data;
    });
  }
}
