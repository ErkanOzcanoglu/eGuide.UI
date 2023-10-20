import { SocketService } from './../../services/socket.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Socket } from 'src/app/models/socket';
import { StationModelService } from 'src/app/services/station-model.service';
import { StationSocketService } from 'src/app/services/station-socket.service';
import { StationService } from 'src/app/services/station.service';
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
  @Input() mapClickedData: any;
  constructor(
    private formBuilder: FormBuilder,
    private socketService: SocketService,
    private stationService: StationService,
    private stationModelService: StationModelService,
    private stationSocketService: StationSocketService
  ) {
    this.stationForm = this.formBuilder.group({
      address: [''],
      latitude: [''],
      longitude: [''],
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
      stationModelId: ['', Validators.required],
    });

    this.stationModelForm = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.selectedSocketsForm = this.formBuilder.group({
      sockets: [[], Validators.required],
    });

    this.stationSocketForm = this.formBuilder.group({
      socketId: ['', Validators.required],
      stationModelId: ['', Validators.required],
    });
  }

  onSubmit() {
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
          this.stationService.createStation(this.stationForm.value).subscribe({
            next: (station) => {
              this.stationId = station.id;
              this.selectedSocketsForm.value.sockets.forEach(
                (socketId: number) => {
                  this.stationSocketForm.patchValue({
                    socketId: socketId,
                    stationModelId: stationModel.id,
                  });
                  this.stationSocketService
                    .createStationSocket(this.stationSocketForm.value)
                    .subscribe({
                      next: (stationSocket) => {
                        console.log(stationSocket);
                      },
                      error: (err) => {
                        console.log(err);
                      },
                    });
                }
              );
            },
          });
        },
      });
  }
}
