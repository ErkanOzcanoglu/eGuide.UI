import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-color-customization',
  templateUrl: './color-customization.component.html',
  styleUrls: ['./color-customization.component.css'],
})
export class ColorCustomizationComponent implements OnInit {
  colorForm: FormGroup = new FormGroup({});
  color: Color[] = [];
  colorId?: string;
  constructor(
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getColor();
  }

  initializeForm() {
    this.colorForm = this.formBuilder.group({
      lightColor1: [
        '',
        [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
      ],
      lightColor2: [
        '',
        [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
      ],
      lightColor3: [
        '',
        [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
      ],
      lightColor4: [
        '',
        [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
      ],
      lightColor5: [''],
      darkColor1: [
        '',
        [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
      ],
      darkColor2: [
        '',
        [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
      ],
      darkColor3: [
        '',
        [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
      ],
      darkColor4: [
        '',
        [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
      ],
      darkColor5: [''],
    });
  }

  getColor() {
    this.colorService.getColor().subscribe((response) => {
      this.colorId = response[0].id;
      this.colorForm.patchValue({
        lightColor1: response[0].lightColor1,
        lightColor2: response[0].lightColor2,
        lightColor3: response[0].lightColor3,
        lightColor4: response[0].lightColor4,
        lightColor5: response[0].lightColor5,

        darkColor1: response[0].darkColor1,
        darkColor2: response[0].darkColor2,
        darkColor3: response[0].darkColor3,
        darkColor4: response[0].darkColor4,
        darkColor5: response[0].darkColor5,
      });
      this.color = response;
    });
  }

  onSubmit() {
    if (this.colorId != null && this.colorForm.valid) {
      this.colorService
        .updateColor(this.colorId, this.colorForm.value)
        .subscribe({
          next: () => {
            this.toastrService.success('Color updated successfully');
            this.getColor();
          },
          error: () => {
            this.toastrService.error('Color update failed');
          },
        });
    } else {
      this.toastrService.error('Color update failed');
    }
  }
}
