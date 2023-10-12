import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Connector } from 'src/app/models/connector';
import { ConnectorService } from 'src/app/services/connector.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-socket-form',
  templateUrl: './socket-form.component.html',
  styleUrls: ['./socket-form.component.css'],
})
export class SocketFormComponent {
  switchStatus = false;
  connectors: Connector[] = [];
  socketForm: FormGroup = new FormGroup({});

  constructor(
    private connectorService: ConnectorService,
    private socketService: SocketService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getConnector();
    this.initializeForm();
  }

  initializeForm() {
    this.socketForm = this.formBuilder.group({
      power: ['', [Validators.required]],
      voltage: ['', [Validators.required]],
      current: ['', [Validators.required]],
      type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      connectorId: ['', [Validators.required]],
    });
  }

  addSocket() {
    if (this.socketForm.valid) {
      this.socketService.addSocket(this.socketForm.value).subscribe((asd) => {
        console.log(asd);
      });
    } else {
      console.log('Form is not valid');
    }
    this.socketForm.reset();
  }

  getConnector(): void {
    this.connectorService.getConnectors().subscribe((asd) => {
      this.connectors = asd;
    });
  }

  toggleSwitch() {
    this.switchStatus = !this.switchStatus;
    console.log(this.switchStatus);
  }
}
