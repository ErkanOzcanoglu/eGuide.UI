import { ServiceService } from './../../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Service } from 'src/app/models/service';
import { setServiceEditData } from 'src/app/state/service-edit-data/service-edit-data.action';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent implements OnInit {
  services: Service[] = [];
  serviceEditData$: any;
  constructor(
    private serviceService: ServiceService,
    private store: Store<{ serviceEditData: any }>
  ) {}

  ngOnInit(): void {
    this.getService();
  }

  getService() {
    this.serviceService.getAllServiceList().subscribe((data) => {
      this.services = data;
      console.log(data);
    });
  }

  deleteService(id: any) {
    this.serviceService.deleteService(id).subscribe((data) => {
      console.log(data);
      this.getService();
    });
  }

  editService(service: Service) {
    this.store.dispatch(setServiceEditData({ serviceEditData: service }));
    console.log(service, 'service');
  }
}
