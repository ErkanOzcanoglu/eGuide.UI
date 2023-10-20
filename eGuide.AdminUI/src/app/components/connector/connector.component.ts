import { Component, OnInit } from '@angular/core';
import { Connector } from 'src/app/models/connector';
import { ConnectorService } from 'src/app/services/connector.service';

@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.css'],
})
export class ConnectorComponent implements OnInit {
  connectors: Connector[] = [];
  constructor(private connectorService: ConnectorService) {}

  ngOnInit() {
    this.getConnectors();
  }

  getConnectors() {
    this.connectorService.getConnectors().subscribe((connectors) => {
      this.connectors = connectors;
    });
  }
}
