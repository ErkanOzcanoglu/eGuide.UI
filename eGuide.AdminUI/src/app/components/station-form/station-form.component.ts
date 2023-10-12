import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Socket } from 'src/app/models/socket';
import { SocketService } from 'src/app/services/socket.service';
import { StationService } from 'src/app/station.service';

@Component({
  selector: 'app-station-form',
  templateUrl: './station-form.component.html',
  styleUrls: ['./station-form.component.css'],
})
export class StationFormComponent {
  switchStatus = false;
  sockets: Socket[] = [];
  stationForm: FormGroup = new FormGroup({});
  stationSocketForm: FormGroup = new FormGroup({});
  socketForm2: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private socketService: SocketService,
    private stationService: StationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.stationForm = this.formBuilder.group({
      address: ['', Validators.required],
      latitude: ['', Validators.required],
      longtitude: ['', Validators.required],
    });

    this.stationSocketForm = this.formBuilder.group({
      name: ['', Validators.required],
      stationId: ['', Validators.required],
      socketId: ['', Validators.required],
    });

    this.socketForm2 = this.formBuilder.group({
      socketIds: [[], Validators.required],
    });
  }

  getSocket() {
    this.socketService.getSockets().subscribe((response) => {
      this.sockets = response;
    });
  }

  toggleSwitch() {
    this.switchStatus = !this.switchStatus;
    console.log(this.switchStatus);
  }
}
