import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LogService } from 'src/app/services/log.service';
@Injectable({
  providedIn: 'root',
})
export class LogHelper {
  logForm: FormGroup = new FormGroup({});

  constructor(
    private logService: LogService,
    private formBuilder: FormBuilder
  ) {}

  initializeForm() {
    this.logForm = this.formBuilder.group({
      message: [''],
      level: [''],
      source: [''],
    });
  }

  successLogin(email: string) {
    this.initializeForm();
    this.logForm.patchValue({
      message: `${email} logged in at ${new Date().toLocaleString()}`,
      level: 'info',
      source: 'web',
    });
    console.log(this.logForm.value);
    this.logService.userLog(this.logForm.value).subscribe();
  }

  errorLogin(email: string, error: any) {
    this.initializeForm();
    this.logForm.patchValue({
      message: `${email} tried to log in at ${new Date().toLocaleString()}. Error: ${
        error.error.error
      }`,
      level: 'error',
      source: 'web',
    });
    this.logService.userLog(this.logForm.value).subscribe();
  }

  successProcess(process: string) {
    this.initializeForm();
    this.logForm.patchValue({
      message: `${process} at ${new Date().toLocaleString()}`,
      level: 'info',
      source: 'web',
    });
    this.logService.userLog(this.logForm.value).subscribe();
  }

  errorProcess(process: string, error: any) {
    this.initializeForm();
    this.logForm.patchValue({
      message: `${process} at ${new Date().toLocaleString()}. Error: ${
        error.error.error
      }`,
      level: 'error',
      source: 'web',
    });
    this.logService.userLog(this.logForm.value).subscribe();
  }
}
