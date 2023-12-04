import { ServiceService } from './../../services/service.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent implements OnInit {
  service?: Service[];
  width?: number;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getWindowWidth();
  }
  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.getServices();
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
