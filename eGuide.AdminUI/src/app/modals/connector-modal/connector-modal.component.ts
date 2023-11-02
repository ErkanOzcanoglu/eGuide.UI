import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Connector } from 'src/app/models/connector';
import { ConnectorService } from 'src/app/services/connector.service';
import { Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.connectorForm = this.formBuilder.group({
      type: ['', [Validators.required]],
      icon: ['', [Validators.required]],
    });
  }

  addConnector() {
    this.connectorService.createConnector(this.connectorForm.value).subscribe({
      next: (data) => {
        this.connector = data;
      },
    });
  }
}
