import { ServiceService } from './../../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Service } from 'src/app/models/service';
import { setServiceEditData } from 'src/app/state/service-edit-data/service-edit-data.action';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent implements OnInit {
  services: Service[] = [];
  serviceEditData$: Service[] = [];
  constructor(
    private serviceService: ServiceService,
    private store: Store<{ serviceEditData: Service }>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getService();
  }

  getService() {
    this.serviceService.getAllServiceList().subscribe((data) => {
      this.services = data;
    });
  }

  deleteService(id: any) {
    this.serviceService.deleteService(id).subscribe((data) => {
      this.getService();
      this.toastr.success('Service deleted successfully');
    });
  }

  editService(service: Service) {
    this.store.dispatch(setServiceEditData({ serviceEditData: service }));
  }
}
