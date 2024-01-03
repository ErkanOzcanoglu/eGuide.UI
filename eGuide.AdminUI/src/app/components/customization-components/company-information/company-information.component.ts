import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Website } from 'src/app/models/website';
import { WebsiteService } from 'src/app/services/website.service';

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.css'],
})
export class CompanyInformationComponent implements OnInit {
  isEdit = false;
  companyInformationForm: FormGroup = new FormGroup({});
  website: Website[] = [];
  isWebsiteEmpty = false;

  constructor(
    private websiteService: WebsiteService,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getWebsite();
  }

  getWebsite() {
    this.websiteService.getWebsite().subscribe((website) => {
      this.website = website;
      if (this.website.length == 0) {
        this.isWebsiteEmpty = true;
      }
    });
  }

  initializeForm() {
    this.companyInformationForm = this.formBuilder.group({
      description: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      name: ['', Validators.required],
      navbar: [0],
      footer: [0],
    });
  }

  onSubmit() {
    this.companyInformationForm.patchValue({
      navbar: 1,
      footer: 1,
    });
    if (this.companyInformationForm.valid) {
      this.websiteService
        .addWebsite(this.companyInformationForm.value)
        .subscribe({
          next: () => {
            this.toast.success('Website added successfully');
            this.getWebsite();
          },
          error: () => {
            this.toast.error('There was an error!');
          },
        });
    } else {
      this.toast.error('Please fill all the required fields');
    }
  }

  onUpdate(id: string) {
    if (this.companyInformationForm.valid) {
      this.websiteService
        .updateWebsite(id, this.companyInformationForm.value)
        .subscribe({
          next: () => {
            this.toast.success('Website updated successfully');
            this.getWebsite();
            this.isEdit = false;
          },
          error: () => {
            this.toast.error('There was an error!');
          },
        });
    } else {
      this.toast.error('Please fill all the required fields');
    }
  }

  editWebsite() {
    this.isEdit = true;
  }

  cancelEdit() {
    this.isEdit = false;
  }
}
