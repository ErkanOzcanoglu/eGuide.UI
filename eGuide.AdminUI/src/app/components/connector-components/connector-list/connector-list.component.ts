import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Connector } from 'src/app/models/connector';
import { ConnectorService } from 'src/app/services/connector.service';

@Component({
  selector: 'app-connector-list',
  templateUrl: './connector-list.component.html',
  styleUrls: ['./connector-list.component.css'],
})
export class ConnectorListComponent implements OnInit {
  connectorList: Connector[] = [];
  connectorForm: FormGroup = new FormGroup({});

  @Output() editConnectorEvent = new EventEmitter<string>();

  constructor(
    private connectorService: ConnectorService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getConnector();
    this.initializeForm();
  }

  initializeForm() {
    this.connectorForm = this.formBuilder.group({
      type: [''],
      imageData: [''],
      imageName: [''],
    });
  }

  getConnector() {
    this.connectorService.getConnectors().subscribe((connectors) => {
      this.connectorList = connectors;
      console.log(this.connectorList);
    });
  }

  updateConnector(id: string) {
    this.connectorService
      .updateConnector(id, this.connectorForm.value)
      .subscribe();
    setTimeout(() => {
      this.getConnector();
    }, 100);
  }

  editConnector(id: string) {
    this.editConnectorEvent.emit(id);
  }

  toggleEdit(connector: Connector) {
    this.connectorList.forEach((element) => {
      element.editingMode = false;
    });
    connector.editingMode = !connector.editingMode;
  }

  closeEdit(connector: Connector) {
    connector.editingMode = false;
  }

  deleteConnector(id: string) {
    this.connectorService.deleteConnector(id).subscribe();
    setTimeout(() => {
      this.getConnector();
    }, 100);
  }
}
