import { Component, OnInit } from '@angular/core';
import { ChargingUnitService } from 'src/app/services/charging-unit.service';
import { StationService } from 'src/app/services/station.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent implements OnInit {
  stationCount?: number;
  vehicleCount?: number;
  chargingUnitCount?: number;

  constructor(
    private stationService: StationService,
    private vehicleService: VehicleService,
    private chargingUnitService: ChargingUnitService
  ) {}

  ngOnInit(): void {
    this.getStationCount();
    this.getVehicleCount();
    this.getChargingUnitCount();
  }

  getStationCount() {
    this.stationService.getAllStaiton().subscribe((data) => {
      if (data.length > 0) this.stationCount = data.length;
      else this.stationCount = 0;
      console.log(this.stationCount);
    });
  }

  getVehicleCount() {
    this.vehicleService.getAllVehicles().subscribe((data) => {
      if (data.length > 0) this.vehicleCount = data.length;
      else this.vehicleCount = 0;
      console.log(this.vehicleCount);
    });
  }

  getChargingUnitCount() {
    this.chargingUnitService.getChargingUnits().subscribe((data) => {
      if (data.length > 0) this.chargingUnitCount = data.length;
      else this.chargingUnitCount = 0;
      console.log(this.chargingUnitCount);
    });
  }
}
