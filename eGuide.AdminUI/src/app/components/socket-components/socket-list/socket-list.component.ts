import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Socket } from 'src/app/models/socket';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-socket-list',
  templateUrl: './socket-list.component.html',
  styleUrls: ['./socket-list.component.css'],
})
export class SocketListComponent implements OnInit {
  socketList: Socket[] = [];
  socketUpdteForm: FormGroup = new FormGroup({});
  socketUpdateControl = new FormControl('');
  isDisable = true;
  constructor(
    private socketService: SocketService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getStationList();
    this.initializeForm();
  }

  getStationList() {
    this.socketService.getSockets().subscribe({
      next: (data) => {
        this.socketList = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  toggleEdit(socket: Socket) {
    // other sockets should be disabled
    this.socketList.forEach((element) => {
      element.editingMode = false;
    });
    socket.editingMode = !socket.editingMode;
  }

  closeEdit(socket: Socket) {
    socket.editingMode = false;
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
    this.socketService.updateSocket(id, this.socketUpdteForm.value).subscribe({
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
