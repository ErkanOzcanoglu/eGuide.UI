import { Website } from './../../models/website';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactFormService } from 'src/app/services/contact-form.service';
import { WebsiteService } from 'src/app/services/website.service';
import { ColorHelper } from '../generic-helper/color/color-helper';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  providers: [ColorHelper],
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({});
  websites: Website[] = [];
  isSending = false;
  color: Color = new Color();

  constructor(
    private formBuilder: FormBuilder,
    private contactFormService: ContactFormService,
    private websiteService: WebsiteService,
    private toastrService: ToastrService,
    private colorHelper: ColorHelper
  ) {}

  ngOnInit(): void {
    this.getWebsites();
    this.getColor();

    this.contactForm = this.formBuilder.group({
      name: [''],
      email: [''],
      message: [''],
    });
  }

  getColor() {
    this.colorHelper.getLocalColors(this.color);
  }

  onSubmit(): void {
    this.isSending = true;
    this.contactFormService.sendEmail(this.contactForm.value).subscribe(
      (response) => {
        this.toastrService.success('Email sent successfully');
        this.reset();
        this.isSending = false;
      },
      (error) => {
        this.toastrService.error('Email not sent');
      }
    );
  }

  getWebsites(): void {
    this.websiteService.getWebsite().subscribe(
      (response) => {
        this.websites = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  reset(): void {
    this.contactForm.reset();
  }
}
