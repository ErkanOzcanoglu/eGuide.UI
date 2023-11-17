import { ServiceService } from './../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent implements OnInit {
  service?: Service[];

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.getServices();
  }

  getServices() {
    this.serviceService.getAllServices().subscribe((data) => {
      this.service = data;
      console.log(data);
    });
  }
}
