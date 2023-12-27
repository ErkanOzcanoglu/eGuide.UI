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
    private store: Store,
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

  deleteService(id: string) {
    this.serviceService.deleteService(id).subscribe({
      next: () => {
        this.getService();
        this.toastr.success('Service deleted successfully');
      },
      error: () => {
        this.toastr.error('Service not deleted');
      },
    });
  }

  editService(service: Service) {
    this.store.dispatch(setServiceEditData({ serviceEditData: service }));
  }
}
