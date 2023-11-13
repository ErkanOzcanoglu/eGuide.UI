import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Connector } from 'src/app/models/connector';
import { ConnectorService } from 'src/app/services/connector.service';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-connector-modal',
  templateUrl: './connector-modal.component.html',
  styleUrls: ['./connector-modal.component.css'],
})
export class ConnectorModalComponent implements OnInit {
  connector = new Connector();
  connectorForm: FormGroup = new FormGroup({});

  constructor(
    private connectorService: ConnectorService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.connectorForm = this.formBuilder.group({
      type: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }

  addConnector() {
    if (this.connectorForm.valid) {
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
    } else {
      this.toaster.error('Form is not valid');
    }
  }
}
