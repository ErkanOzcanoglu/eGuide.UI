import { Mail, ReplyMail } from './../../models/mail';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { ContactService } from 'src/app/services/contact.service';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css'],
})
export class MessageModalComponent implements OnInit {
  mails: Mail[] = [];
  adminMail: any;
  id: any;
  replyForm: FormGroup = new FormGroup({});

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
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
        this.getMails();
      }, 10000);
    });
    this.getMails();
  }

  initializeForm() {
    this.replyForm = this.formBuilder.group({
      name: [''],
      email: [''],
      message: [''],
      adminMail: [''],
    });
  }

  getMails() {
    this.contactService.getMails().subscribe((response) => {
      this.mails = response;
    });
  }

  readMail(id: any) {
    this.contactService.readMail(id).subscribe((response) => {
      this.getMails();
    });
  }

  deleteMail(id: any) {
    console.log(id);
    this.contactService.deleteMail(id).subscribe((response) => {
      console.log(response);
      this.getMails();
    });
  }

  replyTo(mail: any, answerMessage: string) {
    const adminId = localStorage.getItem('authToken');
    this.adminService.getAdminInfo(adminId).subscribe((response) => {
      this.replyForm.patchValue({
        name: mail.name,
        email: mail.email,
        message: answerMessage,
        adminMail: response.email,
      });
      console.log(this.replyForm.value, 'reply form value');
      this.contactService.replyTo(this.replyForm.value).subscribe();
    });
  }

  getMailId(id: any) {
    console.log(id);
    this.id = id;
    Swal.fire({
      // print the mail details
      title: 'Mail Details',
      text: 'Mail Details',
      html: `
      <div class="flex flex-col justify-start items-start">
        <div>
          <span class="text-sm mr-2">Name:</span>
          <span class="text-sm font-bold">
            ${this.mails.find((x) => x.id == id)?.name}
          </span>
        </div>
        <div>
          <span class="text-sm mr-2">Email:</span>
          <span class="text-sm font-bold">
            <a class="text-blue-500 hover:underline">
              ${this.mails.find((x) => x.id == id)?.email}
            </a>
          </span>
        </div>
        <div>
          <span class="text-sm mr-2 flex text-start">Message:</span>
          <span class="text-sm font-bold flex justify-start items-start text-justify">
            ${this.mails.find((x) => x.id == id)?.message}
          </span>
        </div>
      </div>`,
      showCancelButton: true,
      confirmButtonText: `Delete`,
      cancelButtonText: `Reply`,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#3B82F6',
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
        this.deleteMail(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Reply',
          input: 'textarea',
          inputPlaceholder: 'Type your message here...',
          showCancelButton: true,
          confirmButtonText: 'Send',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            this.replyTo(
              this.mails.find((x) => x.id == id),
              result.value
            );
            Swal.fire('Sent!', '', 'success');
          }
        });
      }
    });
  }
}
