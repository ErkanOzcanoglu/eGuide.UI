import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { ChargingUnit } from 'src/app/models/charging-unit';
import { Connector } from 'src/app/models/connector';
import { ChargingUnitService } from 'src/app/services/charging-unit.service';
import { RefreshState } from 'src/app/state/refresh-list/refresh-list.reducer';
import { selectRefresh } from 'src/app/state/refresh-list/refresh-list.selector';

@Component({
  selector: 'app-socket-list',
  templateUrl: './socket-list.component.html',
  styleUrls: ['./socket-list.component.css'],
})
export class SocketListComponent implements OnInit {
  socketList: ChargingUnit[] = [];
  connectorList: Connector[] = [];
  refData = false;
  socketUpdteForm: FormGroup = new FormGroup({});
  socketUpdateControl = new FormControl('');
  isDisable = true;
  constructor(
    private chargingUnitService: ChargingUnitService,
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.store.select(selectRefresh).subscribe((refresh: boolean) => {
      if (refresh === true) {
        this.getChargingUnitList();
      }
    });
  }

  ngOnInit(): void {
    this.getChargingUnitList();
    this.initializeForm();
  }

  getChargingUnitList() {
    this.chargingUnitService.getChargingUnits().subscribe({
      next: (data) => {
        this.socketList = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  toggleEdit(chargingUnit: ChargingUnit) {
    // other sockets should be disabled
    this.socketList.forEach((element) => {
      element.editingMode = false;
    });
    chargingUnit.editingMode = !chargingUnit.editingMode;
  }

  closeEdit(chargingUnit: ChargingUnit) {
    chargingUnit.editingMode = false;
  }

  initializeForm() {
    this.socketUpdteForm = this.formBuilder.group({
      power: [''],
      voltage: [''],
      current: [''],
      type: [''],
      name: [''],
    });
  }

  updateSocket(id: string) {
    this.chargingUnitService
      .updateChargingUnit(id, this.socketUpdteForm.value)
      .subscribe({
        next: (data) => {
          this.getChargingUnitList();
        },
        error: (error) => {
          console.log(error);
        },
      });
    // refresh the list
    this.getChargingUnitList();
  }

  deleteChargingUnit(id: string) {
    this.chargingUnitService.deleteChargingUnit(id).subscribe({
      next: (data) => {
        console.log(data);
        this.getChargingUnitList();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
