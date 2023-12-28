import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ContactService } from 'src/app/services/contact.service';
@Component({
  selector: 'app-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.css'],
})
export class TabbarComponent implements OnInit {
  mails?: number;
  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.mailCount();
    this.connectHub();
  }
  mailCount() {
    this.contactService.getUnreadMails().subscribe((response) => {
      this.mails = response.length;
    });
  }

  connectHub() {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7297/myHub')
      .build();

    connection
      .start()
      .then(function () {
        console.log('SignalR Connected!');
      })
      .catch(function (err) {
        return console.error(err.toString());
      });

    connection.on('BroadcastMessage', () => {
      setTimeout(() => {
        this.mailCount();
      }, 10000);
    });
  }
}
