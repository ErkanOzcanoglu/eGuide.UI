import { SocketService } from './../../services/socket.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Socket } from 'src/app/models/socket';
import { StationModelService } from 'src/app/services/station-model.service';
import { StationSocketService } from 'src/app/services/station-socket.service';
import { StationService } from 'src/app/services/station.service';
import { ToastrService } from 'ngx-toastr';

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

  @Input() mapClickedData: any;
  @Input() editDatas: any;
  @Output() formAddressData = new EventEmitter<Point>();

  constructor(
    private formBuilder: FormBuilder,
    private socketService: SocketService,
    private stationService: StationService,
    private stationModelService: StationModelService,
    private stationSocketService: StationSocketService,
    private toastr: ToastrService
  ) {
    this.stationForm = this.formBuilder.group({
      address: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      stationModelId: ['', Validators.required],
    });
  }
  ngOnChanges() {
    if (this.mapClickedData) {
      this.stationForm.patchValue({
        address: this.mapClickedData.address,
        latitude: this.mapClickedData.lat,
        longitude: this.mapClickedData.lng,
      });
    }
    if (this.editDatas) {
      console.log(this.editDatas, 'editData');
    }
  }

  ngOnInit(): void {
    this.getSockets();
    this.initializeForm();
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
                      console.log(
                        this.stationSocketForm.value,
                        'stationSocketForm'
                      );
                      this.stationSocketService
                        .createStationSocket(this.stationSocketForm.value)
                        .subscribe({
                          next: (stationSocket) => {
                            console.log(stationSocket);
                          },
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
    console.log(this.stationForm.value, 'submit form');
  }

  onFormSubmit() {
    const addressData = {
      address: this.stationForm.value.address,
      lat: this.stationForm.value.latitude,
      lng: this.stationForm.value.longitude,
    };
    this.formAddressData.emit(addressData);
    console.log(addressData, 'addressData');
  }
}
