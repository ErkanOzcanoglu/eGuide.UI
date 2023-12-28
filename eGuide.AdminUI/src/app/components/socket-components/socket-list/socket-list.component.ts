import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ChargingUnit } from 'src/app/models/charging-unit';
import { Connector } from 'src/app/models/connector';
import { ChargingUnitService } from 'src/app/services/charging-unit.service';
import { selectRefresh } from 'src/app/state/refresh-list/refresh-list.selector';
import Swal from 'sweetalert2';

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
  refreshState$ = this.store.select(selectRefresh);

  constructor(
    private chargingUnitService: ChargingUnitService,
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.refreshState$.subscribe((refresh: boolean) => {
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
        next: () => {
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.chargingUnitService.deleteChargingUnit(id).subscribe({
          next: (data) => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
            console.log(data);
            this.getChargingUnitList();
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    });
  }
}
