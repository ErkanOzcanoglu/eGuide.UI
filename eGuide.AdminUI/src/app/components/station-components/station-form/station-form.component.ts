import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChargingUnit } from 'src/app/models/charging-unit';
import { StationModelService } from 'src/app/services/station-model.service';
import { StationSocketService } from 'src/app/services/station-socket.service';
import { StationService } from 'src/app/services/station.service';
import { ToastrService } from 'ngx-toastr';
import { Store, select } from '@ngrx/store';
import {
  getClickedData,
  getFormAddressData,
} from 'src/app/state/map-click-data/map-click-data.selector';
import {
  MapState,
  setFormAddressData,
} from 'src/app/state/map-click-data/map-click-data.action';
import { getStationEditData } from 'src/app/state/station-edit-data/station-edit-data.selector';
import { Station } from 'src/app/models/station';
import { ChargingUnitService } from 'src/app/services/charging-unit.service';

interface Point {
  lat: number;
  lng: number;
}
@Component({
  selector: 'app-station-form',
  templateUrl: './station-form.component.html',
  styleUrls: ['./station-form.component.css'],
})
export class StationFormComponent implements OnInit {
  switchStatus = false;
  isEdited = false;

  chargingUnit: ChargingUnit[] = [];
  stationId = '';
  selectedChargingUnits: any[] = [];

  stationForm: FormGroup = new FormGroup({});
  stationModelForm: FormGroup = new FormGroup({});
  stationChargingUnitForm: FormGroup = new FormGroup({});
  selectedChargingUnitForm: FormGroup = new FormGroup({});

  apiLoginErrorMessages: string[] = [];
  submitted = false;

  mapClickedData: any;
  editDatas?: Station;

  constructor(
    private formBuilder: FormBuilder,
    private chargingUnitService: ChargingUnitService,
    private stationService: StationService,
    private stationModelService: StationModelService,
    private stationSocketService: StationSocketService,
    private toastr: ToastrService,
    private store: Store<MapState>,
    private store2: Store<{ stationEditData: any }>
  ) {
    this.store.pipe(select(getFormAddressData)).subscribe();

    this.stationForm = this.formBuilder.group({
      address: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      stationModelId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getSockets();
    this.initializeForm();

    this.store.pipe(select(getClickedData)).subscribe((clickedData) => {
      if (clickedData) {
        this.stationForm.patchValue({
          address: clickedData.address,
          latitude: clickedData.lat,
          longitude: clickedData.lng,
        });
      }
    });
    this.store2
      .pipe(select(getStationEditData))
      .subscribe((stationEditData) => {
        console.log(stationEditData.stationEditData, 'stationEditData');
        this.isEdited = true;
        if (stationEditData) {
          this.stationForm.patchValue({
            address: stationEditData.stationEditData?.address,
            latitude: stationEditData.stationEditData?.latitude,
            longitude: stationEditData.stationEditData?.longitude,
            name: stationEditData.stationEditData?.name,
          });

          this.editDatas = stationEditData.stationEditData;

          console.log(this.editDatas?.stationModel?.id, 'stationModelId');
          this.stationModelForm.patchValue({
            name: this.editDatas?.stationModel?.name,
          });

          this.stationChargingUnitForm.patchValue({
            stationModelId: this.editDatas?.stationModel?.id,
          });

          this.selectedChargingUnitForm.patchValue({
            chargingUnit:
              this.editDatas?.stationModel?.stationChargingUnits?.map(
                (stationSocket) => stationSocket.charginUnitId
              ),
          });
        }
      });
  }

  onSelectionChange(event: any) {
    this.selectedChargingUnits = event.value.map((chargingUnitId: string) => {
      return this.chargingUnit.find(
        (chargingUnit) => chargingUnit.id === chargingUnitId
      )?.name;
    });
    console.log(this.selectedChargingUnits, 'selectedSockets');
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
  }

  onSubmit() {
    this.submitted = true;
    if (
      this.stationForm.invalid &&
      this.stationModelForm.invalid &&
      this.selectedChargingUnitForm.invalid &&
      this.stationChargingUnitForm.invalid
    ) {
      console.log('invalid form');
      this.toastr.error('Station creation failed!');
      return;
    } else {
      this.stationModelService
        .createStationModel(this.stationModelForm.value)
        .subscribe({
          next: (stationModel) => {
            this.stationForm.patchValue({ stationModelId: stationModel.id });
            console.log(this.stationForm.value);
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
                  this.selectedChargingUnitForm.value.sockets.forEach(
                    (chargingUnitId: number) => {
                      console.log(stationModel.id, 'stationModelId');
                      this.stationChargingUnitForm.patchValue({
                        chargingUnitId: chargingUnitId,
                        stationModelId: stationModel.id,
                      });
                      console.log(
                        this.stationChargingUnitForm.value,
                        'socketForm'
                      );
                      this.stationSocketService
                        .createStationSocket(this.stationChargingUnitForm.value)
                        .subscribe({
                          error: (err) => {
                            console.log(err);
                            this.toastr.error(
                              'Station Socket creation failed!'
                            );
                            // this.stationModelService
                            //   .hardDeleteStationModel(
                            //     this.stationForm.value.stationModelId
                            //   )
                            //   .subscribe({
                            //     next: (res) => {
                            //       console.log(res);
                            //     },
                            //     error: (err) => {
                            //       console.log(err);
                            //     },
                            //   });
                          },
                        });
                    }
                  );

                  this.stationModelForm.reset();
                  this.stationForm.reset();
                  this.selectedChargingUnitForm.reset();
                  this.stationChargingUnitForm.reset();
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

  submitForm() {
    this.onFormSubmit();
  }

  onFormSubmit() {
    const addressData = {
      address: this.stationForm.value.address,
      lat: this.stationForm.value.latitude,
      lng: this.stationForm.value.longitude,
    };
    this.store.dispatch(setFormAddressData({ formAddressData: addressData }));
  }
}
