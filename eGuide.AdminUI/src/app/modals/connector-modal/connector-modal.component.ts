import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Connector } from 'src/app/models/connector';
import { ConnectorService } from 'src/app/services/connector.service';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-connector-modal',
  templateUrl: './connector-modal.component.html',
  styleUrls: ['./connector-modal.component.css'],
})
export class ConnectorModalComponent implements OnInit {
  connector = new Connector();
  connectorForm: FormGroup = new FormGroup({});
  files: File[] = [];
  imageId: any;
  imageData?: string;

  constructor(
    private connectorService: ConnectorService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private imageService2: UploadImageService,
    private imageService: ImageService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.getImage();
  }

  initializeForm() {
    this.connectorForm = this.formBuilder.group({
      type: ['', Validators.required],
      imageData: [''],
      imageName: [''],
    });
  }
  addConnector() {
    if (this.connectorForm.valid && this.files[0]) {
      const file_data = this.files[0];
      const data = new FormData();

      data.append('file', file_data);
      data.append('upload_preset', 'eGuide_cloudinary');
      data.append('cloud_name', 'dg7apl0rh');
      data.append('ImageName', this.files[0].name);

      this.imageService2.uploadImage(data).subscribe((res) => {
        this.connectorForm.patchValue({
          imageName: file_data.name,
          imageData: res.secure_url,
        });
        this.connectorService
          .createConnector(this.connectorForm.value)
          .subscribe({
            next: (data) => {
              this.connector = data;
              this.connectorForm.reset();
              this.toaster.success('Connector added');
            },
            error: () => {
              this.toaster.error('Error while adding connector');
            },
          });
      });
    }

    if (!this.files[0]) {
      alert('Please select an image');
      return;
    }
  }

  isValidImageFormat(base64String: string): boolean {
    return (
      base64String.startsWith('data:image/jpeg;base64,') ||
      base64String.startsWith('data:image/png;base64,') ||
      base64String.startsWith('data:image/jpg;base64,')
    );
  }

  onFileSelect(event: any) {
    this.files.push(event.target.files[0]);
  }

  getImage() {
    this.imageService.getImageById().subscribe((res) => {
      this.imageId = res;
      this.imageData = this.imageId.imageData;
    });
  }
}
