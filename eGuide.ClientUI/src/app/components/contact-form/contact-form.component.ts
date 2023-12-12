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
import { selectThemeData } from 'src/app/state/theme.selector';
import { TranslateService } from '@ngx-translate/core';
import { selectLanguage } from 'src/app/state/language-state/language.selector';
import { LogHelper } from '../generic-helper/log/log-helper';


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
  language$: Observable<string>;
  selectedLanguage = '';

  constructor(
    private formBuilder: FormBuilder,
    private contactFormService: ContactFormService,
    private websiteService: WebsiteService,
    private toastrService: ToastrService,
    private colorHelper: ColorHelper,
    private store: Store<{ theme: any }>,
    public translateService: TranslateService,
    private logHelper: LogHelper

  ) {
    this.language$ = this.store.select(selectLanguage);
    this.contactForm = this.formBuilder.group({
      name: [''],
      email: [''],
      message: [''],
    });
  }

  ngOnInit(): void {
    this.language$.subscribe((currentState) => {
      this.selectedLanguage = currentState;
      this.translateService.use(this.selectedLanguage);
      console.log('deneme ngrx liste servisdi', this.selectedLanguage);
    });

    this.getWebsites();
    this.getColor();

    this.store.pipe(select(selectThemeData)).subscribe((theme) => {
      setTimeout(() => {
        this.colorHelper.getColors();
        this.colorHelper.getLocalColors(this.color);
      }, 50);
    });
  }
  getColor() {
    this.colorHelper.getLocalColors(this.color);
    console.log(this.color.color1, 'asdşlasdşl');
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
        this.logHelper.errorProcess('sendEmail', error);
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
        this.logHelper.errorProcess('getWebsites', error);
        console.log(error);
      }
    );
  }

  reset(): void {
    this.contactForm.reset();
  }
}
