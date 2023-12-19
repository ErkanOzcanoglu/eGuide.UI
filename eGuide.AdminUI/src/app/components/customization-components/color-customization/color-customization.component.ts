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
      lightColor1: ['', Validators.required],
      lightColor2: ['', Validators.required],
      lightColor3: ['', Validators.required],
      lightColor4: ['', Validators.required],
      lightColor5: ['', Validators.required],
      darkColor1: [''],
      darkColor2: [''],
      darkColor3: [''],
      darkColor4: [''],
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
    this.colorService.updateColor(this.colorId, this.colorForm.value).subscribe(
      () => {
        this.toastrService.success('Color updated successfully');
        this.getColor();
      },
      () => {
        this.toastrService.error('Color update failed');
      }
    );
  }
}
