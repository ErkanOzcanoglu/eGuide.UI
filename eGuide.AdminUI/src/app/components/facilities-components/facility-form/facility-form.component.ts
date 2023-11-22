import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacilityService } from 'src/app/services/facility.service';

@Component({
  selector: 'app-facility-form',
  templateUrl: './facility-form.component.html',
  styleUrls: ['./facility-form.component.css'],
})
export class FacilityFormComponent implements OnInit {
  // nameForm: FormGroup = new FormGroup({});
  // facilityForm: FormGroup = new FormGroup({});

  // constructor(private formBuilder: FormBuilder) {
  //   this.nameForm = this.formBuilder.group({
  //     facilities: this.formBuilder.array([]),
  //   });
  //   this.facilityForm = this.formBuilder.group({
  //     type: ['', Validators.required],
  //     name: ['', Validators.required],
  //     icon: ['', Validators.required],
  //   });
  // }

  // ngOnInit(): void {
  //   this.addName();
  // }

  // get nameControls() {
  //   return (this.nameForm.get('facilities') as FormArray).controls;
  // }

  // addName() {
  //   const newFormGroup = this.formBuilder.group({
  //     name: ['', Validators.required],
  //     type: ['', Validators.required],
  //     icon: ['', Validators.required],
  //   });

  //   (this.nameForm.get('facilities') as FormArray).push(newFormGroup);
  // }

  // removeName(index: number) {
  //   (this.nameForm.get('facilities') as FormArray).removeAt(index);
  // }

  // submitForm() {
  //   const formValue = this.nameForm.value;
  //   const formValueJson = JSON.stringify(formValue);
  //   const parsedFormValue = JSON.parse(formValueJson);

  //   console.log(parsedFormValue); // This will be a JavaScript object
  // }

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
