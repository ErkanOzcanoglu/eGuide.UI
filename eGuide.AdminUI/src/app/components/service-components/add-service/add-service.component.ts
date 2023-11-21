import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css'],
})
export class AddServiceComponent implements OnInit {
  selectedLayout?: number;
  service: Service = {
    id: 0,
    name: '',
    description: '',
    image: '',
  };
  serviceForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();
  }

  constructor(private formBuilder: FormBuilder) {}

  initializeForm() {
    this.serviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  layoutType(number: number) {
    if (this.selectedLayout == number) {
      this.selectedLayout = undefined;
    } else {
      this.selectedLayout = number;
    }
  }

  onSubmit() {
    console.log(this.serviceForm.value);
  }
}
