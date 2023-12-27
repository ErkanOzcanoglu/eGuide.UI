import { ServiceService } from './../../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Service } from 'src/app/models/service';
import { setServiceEditData } from 'src/app/state/service-edit-data/service-edit-data.action';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceService.deleteService(id).subscribe({
          next: () => {
            this.getService();
            this.toastr.success('Service deleted successfully');
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          },
          error: (err) => {
            this.toastr.error(err.error);
          },
        });
      }
    });
  }

  editService(service: Service) {
    this.store.dispatch(setServiceEditData({ serviceEditData: service }));
  }
}
