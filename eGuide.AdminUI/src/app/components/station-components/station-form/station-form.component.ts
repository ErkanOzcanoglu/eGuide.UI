import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChargingUnit } from 'src/app/models/charging-unit';
import { StationModelService } from 'src/app/services/station-model.service';
import { StationSocketService } from 'src/app/services/station-socket.service';
import { StationService } from 'src/app/services/station.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import {
  getClickedData,
  getFormAddressData,
} from 'src/app/state/map-click-data/map-click-data.selector';
import { selectStationEditData } from 'src/app/state/station-edit-data/station-edit-data.selector';
import { Station } from 'src/app/models/station';
import { ChargingUnitService } from 'src/app/services/charging-unit.service';
import { Facility } from 'src/app/models/facility';
import { FacilityService } from 'src/app/services/facility.service';
import { StationFacilityService } from 'src/app/services/station-facility.service';

@Component({
  selector: 'app-station-form',
  templateUrl: './station-form.component.html',
  styleUrls: ['./station-form.component.css'],
})
export class StationFormComponent implements OnInit {
  mapClickedData?: Station;
  editDatas?: Station;

  switchStatus = false;
  isEdited = false;
  submitted = false;
  customButton?: number;
  stationId!: string;
  stationModelId?: string;

  apiLoginErrorMessages: string[] = [];
  chargingUnit: ChargingUnit[] = [];
  facilities: Facility[] = [];
  selectedChargingUnits: ChargingUnit[] = [];

  stationForm: FormGroup = new FormGroup({});
  stationModelForm: FormGroup = new FormGroup({});
  stationChargingUnitForm: FormGroup = new FormGroup({});
  selectedChargingUnitForm: FormGroup = new FormGroup({});
  selectedFacilitiesForm: FormGroup = new FormGroup({});

  getFormAddressData$ = this.store.select(getFormAddressData);
  getClickedData$ = this.store.select(getClickedData);
  selectStationEditData$ = this.store.select(selectStationEditData);

  constructor(
    private formBuilder: FormBuilder,
    private chargingUnitService: ChargingUnitService,
    private stationService: StationService,
    private stationModelService: StationModelService,
    private stationSocketService: StationSocketService,
    private toastr: ToastrService,
    private facility: FacilityService,
    private stationFacilityService: StationFacilityService,
    private store: Store
  ) {
    this.getFormAddressData$.subscribe();
    this.stationForm = this.formBuilder.group({
      address: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      stationModelId: ['', Validators.required],
      stationStatus: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getSockets();
    this.initializeForm();
    this.getFacilities();

    // this.store.select(getClickedData).subscribe((clickedData) => {
    this.getClickedData$.subscribe((clickedData) => {
      if (clickedData) {
        this.stationForm.patchValue({
          address: clickedData.address,
          latitude: clickedData.lat,
          longitude: clickedData.lng,
        });
      }
    });
    // this.store.select(selectStationEditData).subscribe((stationEditData) => {
    this.selectStationEditData$.subscribe((stationEditData) => {
      if (stationEditData.stationEditData?.address !== undefined)
        this.isEdited = true;
      if (stationEditData) {
        this.stationForm.patchValue({
          address: stationEditData.stationEditData?.address,
          latitude: stationEditData.stationEditData?.latitude,
          longitude: stationEditData.stationEditData?.longitude,
          name: stationEditData.stationEditData?.name,
          stationStatus: stationEditData.stationEditData?.stationStatus,
        });
        this.setButtonColor(stationEditData.stationEditData?.stationStatus);

        this.editDatas = stationEditData.stationEditData;

        this.stationModelForm.patchValue({
          name: this.editDatas?.stationModel?.name,
        });

        this.stationChargingUnitForm.patchValue({
          stationModelId: this.editDatas?.stationModel?.id,
        });

        this.selectedChargingUnitForm.patchValue({
          chargingUnit:
            this.editDatas?.stationModel?.stationsChargingUnits?.map(
              (stationSocket) => stationSocket.charginUnitId
            ),
        });
      }
    });
  }

  setButtonColor(stationStatus: number | undefined): void {
    const element = document.getElementById('customButton');

    if (element instanceof HTMLElement) {
      this.customButton = stationStatus;
    } else {
      this.customButton = undefined;
    }
  }

  onSelectionChange(event: any) {
    this.selectedChargingUnits = event.value.map((chargingUnitId: string) => {
      return this.chargingUnit.find(
        (chargingUnit) => chargingUnit.id === chargingUnitId
      )?.name;
    });
  }

  setSwitch(): void {
    this.switchStatus = !this.switchStatus;
  }

  getSockets(): void {
    this.chargingUnitService.getChargingUnits().subscribe((chargingUnit) => {
      this.chargingUnit = chargingUnit;
    });
  }

  initializeForm(): void {
    this.stationForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: [''],
      latitude: [''],
      longitude: [''],
      stationModelId: [''],
      stationStatus: [0],
    });

    this.stationModelForm = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.selectedChargingUnitForm = this.formBuilder.group({
      sockets: ['', Validators.required],
    });

    this.stationChargingUnitForm = this.formBuilder.group({
      chargingUnitId: ['', Validators.required],
      stationModelId: [''],
    });

    this.selectedFacilitiesForm = this.formBuilder.group({
      facilities: ['', Validators.required],
    });
  }

  getFacilities(): void {
    this.facility.getFacilities().subscribe((facilities) => {
      this.facilities = facilities;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (
      this.stationForm.invalid &&
      this.stationModelForm.invalid &&
      this.selectedChargingUnitForm.invalid &&
      this.stationChargingUnitForm.invalid &&
      this.selectedFacilitiesForm.invalid
    ) {
      this.toastr.error('Station creation failed!');
      return;
    } else {
      this.stationModelService
        .createStationModel(this.stationModelForm.value)
        .subscribe({
          next: (stationModel) => {
            this.stationForm.patchValue({ stationModelId: stationModel.id });
            // conver lat and lng to string
            this.stationForm.value.latitude =
              this.stationForm.value.latitude.toString();
            this.stationForm.value.longitude =
              this.stationForm.value.longitude.toString();
            this.stationService
              .createStation(this.stationForm.value)
              .subscribe({
                next: (station) => {
                  this.toastr.success('Station created successfully!');
                  this.stationId = station.id;
                  this.selectedFacilitiesForm.value.facilities.forEach(
                    (facilityId: number) => {
                      this.stationFacilityService
                        .createStationFacility({
                          facilityId: facilityId,
                          stationId: this.stationId,
                        })
                        .subscribe({
                          error: (err) => {
                            console.log(err);
                            this.toastr.error(
                              'Station Facility creation failed!'
                            );
                          },
                        });
                    }
                  );

                  this.selectedChargingUnitForm.value.sockets.forEach(
                    (chargingUnitId: number) => {
                      this.stationChargingUnitForm.patchValue({
                        chargingUnitId: chargingUnitId,
                        stationModelId: stationModel.id,
                      });
                      this.stationSocketService
                        .createStationSocket(this.stationChargingUnitForm.value)
                        .subscribe({
                          error: (err) => {
                            console.log(err);
                            this.toastr.error(
                              'Station Socket creation failed!'
                            );
                          },
                        });
                    }
                  );
                  // this.clearForm();
                },
                error: (err) => {
                  console.log(err);
                  this.toastr.error('Station creation failed!');
                },
              });
          },
          error: (err) => {
            console.log(err);
            this.toastr.error('Station Model creation failed!');
          },
        });
    }
  }

  onUpdate() {
    this.stationModelId = this.editDatas?.stationModel?.id;
    if (this.stationModelId != null) {
      this.stationModelService
        .hardDeleteStationModel(this.stationModelId)
        .subscribe({
          next: () => {
            this.onSubmit();
          },
        });
    }
  }

  clearForm() {
    this.stationModelForm.reset();
    this.stationForm.reset();
    this.selectedChargingUnitForm.reset();
    this.stationChargingUnitForm.reset();
    this.selectedFacilitiesForm.reset();
  }
}
