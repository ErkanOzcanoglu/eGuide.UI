import { Component, OnInit } from '@angular/core';
import { ChargingUnitService } from 'src/app/services/charging-unit.service';
import { FacilityService } from 'src/app/services/facility.service';
import { ServiceService } from 'src/app/services/service.service';
import { SocialMediaService } from 'src/app/services/social-media.service';
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
  socialMediaCount?: number;
  facilityCount?: number;
  serviceCount?: number;

  constructor(
    private stationService: StationService,
    private vehicleService: VehicleService,
    private chargingUnitService: ChargingUnitService,
    private socialMediaService: SocialMediaService,
    private facilityService: FacilityService,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.getStationCount();
    this.getVehicleCount();
    this.getChargingUnitCount();
    this.getSocialMediaCount();
    this.getFacilityCount();
    this.getServiceCount();
  }

  getStationCount() {
    this.stationService.getAllStaiton().subscribe((data) => {
      if (data.length > 0) this.stationCount = data.length;
      else this.stationCount = 0;
    });
  }

  getVehicleCount() {
    this.vehicleService.getAllVehicles().subscribe((data) => {
      if (data.length > 0) this.vehicleCount = data.length;
      else this.vehicleCount = 0;
    });
  }

  getChargingUnitCount() {
    this.chargingUnitService.getChargingUnits().subscribe((data) => {
      if (data.length > 0) this.chargingUnitCount = data.length;
      else this.chargingUnitCount = 0;
    });
  }

  getSocialMediaCount() {
    this.socialMediaService.getSocialMedias().subscribe((data) => {
      if (data.length > 0) this.socialMediaCount = data.length;
      else this.socialMediaCount = 0;
    });
  }

  getFacilityCount() {
    this.facilityService.getFacilities().subscribe((data) => {
      if (data.length > 0) this.facilityCount = data.length;
      else this.facilityCount = 0;
    });
  }

  getServiceCount() {
    this.serviceService.getAllServiceList().subscribe((data) => {
      if (data.length > 0) this.serviceCount = data.length;
      else this.serviceCount = 0;
    });
  }
}
