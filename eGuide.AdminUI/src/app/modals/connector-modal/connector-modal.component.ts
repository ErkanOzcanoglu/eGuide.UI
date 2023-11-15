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

  onSelect(event: any) {
    this.files.push(event.target.files[0]);
  }

  addConnector() {
    if (this.connectorForm.valid && this.files[0]) {
      const file_data = this.files[0];
      const data = new FormData();

      data.append('file', file_data);
      data.append('ImageName', this.files[0].name);

      const reader = new FileReader();
      reader.onload = (event: any) => {
        // Ensure the data URL starts with the appropriate prefix
        const base64String = event.target.result;
        if (this.isValidImageFormat(base64String)) {
          data.append('ImageData', base64String);
          this.connectorForm.patchValue({
            imageName: file_data.name,
            imageData: base64String,
          });
          this.connectorService
            .createConnector(this.connectorForm.value)
            .subscribe({
              next: (data) => {
                this.connector = data;
                this.connectorForm.reset();
                this.toaster.success('Connector added');
              },
              error: (err) => {
                this.toaster.error('Error while adding connector');
              },
            });
          console.log(this.connectorForm.value, 'asdasda');
        } else {
          console.error('Invalid image format');
        }
      };
      reader.readAsDataURL(file_data);
    } else {
      this.toaster.error('Form is not valid');
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
    console.log(this.files);
  }

  getImage() {
    this.imageService.getImageById().subscribe((res) => {
      this.imageId = res;
      this.imageData = this.imageId.imageData;
    });
  }
}
