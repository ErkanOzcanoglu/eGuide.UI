import { Component, OnInit } from '@angular/core';
import { Socket } from 'src/app/models/socket';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-socket-list',
  templateUrl: './socket-list.component.html',
  styleUrls: ['./socket-list.component.css'],
})
export class SocketListComponent implements OnInit {
  socketList: Socket[] = [];
  isDisable = true;
  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.getStationList();
  }

  getStationList() {
    this.socketService.getSockets().subscribe({
      next: (data) => {
        this.socketList = data;
        console.log(data, 'sadşlsadşl');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  toggleEdit(socket: Socket) {
    socket.editingMode = !socket.editingMode;
  }
}
