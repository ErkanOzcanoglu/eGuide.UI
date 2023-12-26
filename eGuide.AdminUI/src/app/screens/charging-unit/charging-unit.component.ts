import { Component } from '@angular/core';

@Component({
  selector: 'app-charging-unit',
  templateUrl: './charging-unit.component.html',
  styleUrls: ['./charging-unit.component.css'],
})
export class ChargingUnitComponent {
  isOpen = false;
  isConnectorListOpen = false;

  addSocket() {
    this.isOpen = !this.isOpen;
    this.isConnectorListOpen = false;
  }

  connectorListIsOpen() {
    this.isConnectorListOpen = !this.isConnectorListOpen;
  }
}
