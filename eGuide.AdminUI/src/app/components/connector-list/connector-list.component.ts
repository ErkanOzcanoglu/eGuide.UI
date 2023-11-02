import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Connector } from 'src/app/models/connector';
import { ConnectorService } from 'src/app/services/connector.service';

@Component({
  selector: 'app-connector-list',
  templateUrl: './connector-list.component.html',
  styleUrls: ['./connector-list.component.css'],
})
export class ConnectorListComponent implements OnInit {
  connectors: Connector[] = [];

  @Output() editConnectorEvent = new EventEmitter<string>();

  constructor(private connectorService: ConnectorService) {}

  ngOnInit(): void {
    this.getConnector();
  }

  getConnector() {
    this.connectorService.getConnectors().subscribe((connectors) => {
      this.connectors = connectors;
      console.log(this.connectors);
    });
  }

  editConnector(id: string) {
    this.editConnectorEvent.emit(id);
  }
}
