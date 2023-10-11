import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Connector } from 'src/app/models/connector';
import { ConnectorService } from 'src/app/services/connector.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-station-model',
  templateUrl: './station-model.component.html',
  styleUrls: ['./station-model.component.css'],
})
export class StationModelComponent {
  switchStatus = false;
  connectors: Connector[] = [];
  socketForm: FormGroup = new FormGroup({});

  constructor(
    private connectorService: ConnectorService,
    private socketService: SocketService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
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

  toggleSwitch() {
    this.switchStatus = !this.switchStatus;
    console.log(this.switchStatus);
  }
}
