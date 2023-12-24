import { Observable } from 'rxjs';
import { Website } from './../../models/website';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactFormService } from 'src/app/services/contact-form.service';
import { WebsiteService } from 'src/app/services/website.service';
import { ColorHelper } from '../generic-helper/color/color-helper';
import { Color, ThemeColor } from 'src/app/models/color';
import { Store, select } from '@ngrx/store';
import { selectThemeData } from 'src/app/state/theme-state/theme.selector';
import { LogHelper } from '../generic-helper/log/log-helper';
import * as signalR from '@microsoft/signalr';
import { ReplayMail } from 'src/app/models/replayMail';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  providers: [ColorHelper, LogHelper],
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({});
  websites: Website[] = [];
  isSending = false;
  color: ThemeColor = new ThemeColor();
  theme$ = this.store.select(selectThemeData);

  constructor(
    private formBuilder: FormBuilder,
    private contactFormService: ContactFormService,
    private websiteService: WebsiteService,
    private toastrService: ToastrService,
    private colorHelper: ColorHelper,
    private store: Store,
    private logHelper: LogHelper
  ) {
    this.contactForm = this.formBuilder.group({
      name: [''],
      email: [''],
      message: [''],
    });
  }

  ngOnInit(): void {
    this.getWebsites();
    this.getColor();

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

    // this.store.select(selectThemeData).subscribe((theme) => {
    this.theme$.subscribe(() => {
      this.colorHelper.getColors();
      this.colorHelper.getLocalColors(this.color);
    });
  }
  getColor() {
    this.colorHelper.getLocalColors(this.color);
    console.log(this.color.color1, 'asdşlasdşl');
  }

  onSubmit(): void {
    this.isSending = true;
    this.contactFormService.sendEmail(this.contactForm.value).subscribe({
      next: (response) => {
        this.toastrService.success('Email sent successfully');
        this.contactFormService.storeMail(this.contactForm.value).subscribe({
          next: (response) => {
            this.contactFormService
              .replayMail(this.contactForm.value)
              .subscribe({
                next: (response) => {
                  this.reset();
                },
                error: (error) => {
                  this.logHelper.errorProcess('replayMail', error);
                  console.log(error);
                },
              });
          },
          error: (error) => {
            this.logHelper.errorProcess('storeMail', error);
            console.log(error);
          },
        });
        this.isSending = false;
      },
      error: (error) => {
        this.logHelper.errorProcess('sendEmail', error);
        this.toastrService.error('Email not sent');
      },
    });
  }

  getWebsites(): void {
    this.websiteService.getWebsite().subscribe(
      (response) => {
        this.websites = response;
      },
      (error) => {
        this.logHelper.errorProcess('getWebsites', error);
        console.log(error);
      }
    );
  }

  reset(): void {
    this.contactForm.reset();
  }

  // replyMail(mail: ReplayMail) {

  //   this.contactForm.patchValue({
  //     name: mail.name,
  //     email: mail.email,
  //     message: mail.message,
  //   });

  //   console.log(this.contactForm.value, 'reply form value');
  //   this.contactFormService.replayMail(this.contactForm.value).subscribe();
  // }
}
