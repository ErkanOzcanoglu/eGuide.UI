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
      icon: [''],
      type: [''],
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
      .subscribe((data) => {
        console.log(data);
      });
    setTimeout(() => {
      this.getConnector();
    }, 100);
  }

  editConnector(id: string) {
    this.editConnectorEvent.emit(id);
  }

  toggleEdit(connector: Connector) {
    // other sockets should be disabled
    this.connectorList.forEach((element) => {
      element.editingMode = false;
    });
    connector.editingMode = !connector.editingMode;
  }

  closeEdit(connector: Connector) {
    connector.editingMode = false;
  }
}
