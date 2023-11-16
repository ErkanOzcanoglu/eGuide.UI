import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ChargingUnit } from 'src/app/models/charging-unit';
import { ChargingUnitService } from 'src/app/services/charging-unit.service';

@Component({
  selector: 'app-socket-list',
  templateUrl: './socket-list.component.html',
  styleUrls: ['./socket-list.component.css'],
})
export class SocketListComponent implements OnInit {
  socketList: ChargingUnit[] = [];
  socketUpdteForm: FormGroup = new FormGroup({});
  socketUpdateControl = new FormControl('');
  isDisable = true;
  constructor(
    private chargingUnitService: ChargingUnitService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getStationList();
    this.initializeForm();
  }

  getStationList() {
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
          console.log(data);
          this.getStationList();
        },
        error: (error) => {
          console.log(error);
        },
      });
    // refresh the list
    this.getStationList();
  }
}
