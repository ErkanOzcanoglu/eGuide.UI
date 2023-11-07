import { SocketService } from './../../services/socket.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Socket } from 'src/app/models/socket';
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

  sockets: Socket[] = [];
  stationId = '';

  stationForm: FormGroup = new FormGroup({});
  stationModelForm: FormGroup = new FormGroup({});
  stationSocketForm: FormGroup = new FormGroup({});
  selectedSocketsForm: FormGroup = new FormGroup({});

  apiLoginErrorMessages: string[] = [];
  submitted = false;

  // @Input() mapClickedData: any;
  mapClickedData: any;
  // @Input() editDatas: any;
  editDatas?: Station;

  constructor(
    private formBuilder: FormBuilder,
    private socketService: SocketService,
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
        }
      });
  }

  setSwitch(): void {
    this.switchStatus = !this.switchStatus;
  }

  getSockets(): void {
    this.socketService.getSockets().subscribe((sockets) => {
      this.sockets = sockets;
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

    this.selectedSocketsForm = this.formBuilder.group({
      sockets: ['', Validators.required],
    });

    this.stationSocketForm = this.formBuilder.group({
      socketId: ['', Validators.required],
      stationModelId: [''],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (
      this.stationForm.invalid &&
      this.stationModelForm.invalid &&
      this.selectedSocketsForm.invalid &&
      this.stationSocketForm.invalid
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
                  this.selectedSocketsForm.value.sockets.forEach(
                    (socketId: number) => {
                      console.log(stationModel.id, 'stationModelId');
                      this.stationSocketForm.patchValue({
                        socketId: socketId,
                        stationModelId: stationModel.id,
                      });

                      this.stationSocketService
                        .createStationSocket(this.stationSocketForm.value)
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
