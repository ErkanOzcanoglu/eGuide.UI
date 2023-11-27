import { Website } from './../../models/website';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactFormService } from 'src/app/services/contact-form.service';
import { WebsiteService } from 'src/app/services/website.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({});
  websites: Website[] = [];
  isSending = false;

  constructor(
    private formBuilder: FormBuilder,
    private contactFormService: ContactFormService,
    private websiteService: WebsiteService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getWebsites();

    this.contactForm = this.formBuilder.group({
      name: [''],
      email: [''],
      message: [''],
    });
  }

  onSubmit(): void {
    this.isSending = true;
    this.contactFormService.sendEmail(this.contactForm.value).subscribe(
      (response) => {
        console.log(response);
        this.toastrService.success('Email sent successfully');
        this.reset();
        this.isSending = false;
      },
      (error) => {
        console.log(error);
        this.toastrService.error('Email not sent');
      }
    );
  }

  getWebsites(): void {
    this.websiteService.getWebsite().subscribe(
      (response) => {
        console.log(response);
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
