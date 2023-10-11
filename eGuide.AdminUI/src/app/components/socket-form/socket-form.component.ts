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
  socketForm2: FormGroup = new FormGroup({});
  // selectedConnectors: string[] = [];

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
      connectorId: [''],
    });

    this.socketForm2 = this.formBuilder.group({
      connectorIds: [[], [Validators.required]],
    });
  }

  addSocket() {
    if (this.socketForm.valid) {
      for (let i = 0; i < this.socketForm2.value.connectorIds.length; i++) {
        this.socketForm.value.connectorId =
          this.socketForm2.value.connectorIds[i];
        console.log(this.socketForm.value);
        this.socketService.addSocket(this.socketForm.value).subscribe((asd) => {
          console.log(asd);
        });
      }
    } else {
      alert('Please fill all the fields');
    }
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
