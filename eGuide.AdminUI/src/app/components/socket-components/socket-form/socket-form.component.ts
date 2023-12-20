import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Connector } from 'src/app/models/connector';
import { ConnectorService } from 'src/app/services/connector.service';
import { ChargingUnitService } from 'src/app/services/charging-unit.service';
import { Store } from '@ngrx/store';
import { setRefresh } from 'src/app/state/refresh-list/refresh-list.action';

@Component({
  selector: 'app-socket-form',
  templateUrl: './socket-form.component.html',
  styleUrls: ['./socket-form.component.css'],
})
export class SocketFormComponent implements OnInit {
  switchStatus = false;
  connectors: Connector[] = [];
  socketForm: FormGroup = new FormGroup({});

  constructor(
    private connectorService: ConnectorService,
    private chargingUnitService: ChargingUnitService,
    private formBuilder: FormBuilder,
    private store: Store
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
      this.chargingUnitService
        .addChargingUnit(this.socketForm.value)
        .subscribe();
    } else {
      console.log('Form is not valid');
    }
    setTimeout(() => {
      this.store.dispatch(setRefresh(true));
    }, 400);
    this.socketForm.reset();
  }

  getConnector(): void {
    this.connectorService.getConnectors().subscribe((asd) => {
      this.connectors = asd;
    });
  }

  toggleSwitch() {
    this.switchStatus = !this.switchStatus;
  }
}
