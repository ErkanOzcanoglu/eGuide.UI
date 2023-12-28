import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { selectServiceEditData } from 'src/app/state/service-edit-data/service-edit-data.selector';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css'],
})
export class ServiceFormComponent implements OnInit {
  files: File[] = [];
  selectedLayout?: number;
  image?: string;
  editData$ = this.store.select(selectServiceEditData);
  service: Service = {
    id: '',
    name: '',
    description: '',
    image: '',
    language: '',
    isSelected: false,
    layout: 0,
  };
  serviceForm: FormGroup = new FormGroup({});
  isEdit = false;

  ngOnInit(): void {
    this.initializeForm();
    this.getEditData();
  }

  constructor(
    private formBuilder: FormBuilder,
    private imageService: UploadImageService,
    private serviceService: ServiceService,
    private toastr: ToastrService,
    private store: Store
  ) {}

  initializeForm() {
    this.serviceForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      language: ['', Validators.required],
      image: [''],
      layout: ['', Validators.required],
    });
  }

  layoutType(number: number) {
    if (this.selectedLayout == number) {
      this.selectedLayout = undefined;
    } else {
      this.selectedLayout = number;
      this.serviceForm.patchValue({
        layout: number,
      });
    }
  }

  getEditData() {
    this.editData$.subscribe((datas) => {
      if (datas) {
        const data = datas.serviceEditData;
        this.serviceForm.patchValue({
          id: data.id,
          name: data.name,
          description: data.description,
          image: data.image,
          layout: data.layout,
        });
        if (this.serviceForm.value.id != '') this.isEdit = true;

        if (data.layout != '') this.selectedLayout = data.layout;
        this.image = data.image;
      }
    });
  }

  onFileSelect(event: any) {
    this.files.push(event.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.image = event.target.result;
    };
  }

  onSubmit() {
    if (
      (this.serviceForm.value.layout === 1 ||
        this.serviceForm.value.layout === 2 ||
        this.serviceForm.value.layout === 3) &&
      this.serviceForm.valid &&
      this.files[0]
    ) {
      const file_data = this.files[0];
      const data = new FormData();

      data.append('file', file_data);
      data.append('upload_preset', 'eGuide_cloudinary');
      data.append('cloud_name', 'dg7apl0rh');

      this.imageService.uploadImage(data).subscribe({
        next: (response) => {
          this.serviceForm.patchValue({
            id: 'd449f754-20a7-453f-aedf-f33a6f1eba9e',
            image: response.secure_url,
          });
          this.serviceService.createService(this.serviceForm.value).subscribe({
            next: () => {
              this.toastr.success('Service added successfully');
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            },
            error: (error) => {
              this.toastr.error('Error while adding service');
              console.log(error);
            },
          });
        },
        error: (error) => {
          this.toastr.error('Error while uploading image');
          console.log(error);
        },
      }),
        () => {
          this.toastr.error('Error while adding service');
        };
    } else {
      console.log('Form is not valid');
    }
  }

  onUpdate() {
    if (this.serviceForm.valid) {
      this.serviceService
        .updateService(this.serviceForm.value.id, this.serviceForm.value)
        .subscribe({
          next: () => {
            this.toastr.success('Service updated successfully');
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          },
          error: (error) => {
            this.toastr.error('Error while updating service');
            console.log(error);
          },
        });
    }
  }

  clearForm() {
    this.files = [];
    this.image = '';
    window.location.reload();
    this.selectedLayout = undefined;
  }
}
