import { Component } from '@angular/core';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css'],
})
export class SocketComponent {
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
