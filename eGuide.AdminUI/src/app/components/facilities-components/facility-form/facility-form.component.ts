import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacilityService } from 'src/app/services/facility.service';

@Component({
  selector: 'app-facility-form',
  templateUrl: './facility-form.component.html',
  styleUrls: ['./facility-form.component.css'],
})
export class FacilityFormComponent implements OnInit {
  facilityForm: FormGroup = new FormGroup({});

  constructor(
    private facilityService: FacilityService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.facilityForm = this.formBuilder.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }
}
