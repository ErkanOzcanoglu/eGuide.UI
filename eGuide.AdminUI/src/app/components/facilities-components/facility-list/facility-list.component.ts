import { FacilityService } from 'src/app/services/facility.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Facility } from 'src/app/models/facility';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.css'],
})
export class FacilityListComponent implements OnInit {
  facilityForm: FormGroup = new FormGroup({});
  isOpen?: boolean = false;
  facilities: Facility[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private facilityService: FacilityService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.getFacilities();
  }

  initializeForm() {
    this.facilityForm = this.formBuilder.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }

  openForm() {
    this.isOpen = !this.isOpen;
    this.facilityForm.reset();
  }

  getFacilities() {
    this.facilityService.getFacilities().subscribe((facilities) => {
      this.facilities = facilities;
    });
  }

  submitForm() {
    this.facilityService.createFacility(this.facilityForm.value).subscribe(
      (facility) => {
        this.facilities.push(facility);
        this.facilityForm.reset();
        this.isOpen = false;
        this.getFacilities();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  toggleEdit(facility: Facility) {
    // other sockets should be disabled
    this.isOpen = false;
    this.facilities.forEach((element) => {
      element.editingMode = false;
    });
    facility.editingMode = !facility.editingMode;
  }

  closeEdit(facility: Facility) {
    facility.editingMode = false;
    this.facilityForm.reset();
  }

  editFacility(facility: Facility) {
    const facilityId = facility.id;
    if (facilityId != null) {
      this.facilityService
        .updateFacility(facilityId, this.facilityForm.value)
        .subscribe({
          next: () => {
            this.getFacilities();
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  deleteFacility(id: string) {
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
        this.facilityService.deleteFacility(id).subscribe({
          next: () => {
            this.getFacilities();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    });
  }
}
