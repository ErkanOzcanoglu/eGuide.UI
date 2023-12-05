import { Color } from 'src/app/models/color';
import { Injectable } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';
@Injectable({
  providedIn: 'root',
})
export class ColorHelper {
  constructor(private colorService: ColorService) {}
  color = new Color();
  localColor = new Color();

  getColors() {
    this.colorService.getColors().subscribe((colors) => {
      this.color = colors[0];
      if (this.color != null)
        if (this.color.lightColor1 !== this.localColor.lightColor1) {
          localStorage.removeItem('lightColor1');
          localStorage.setItem('lightColor1', this.color.lightColor1!);
        }
      if (this.color.lightColor2 !== this.localColor.lightColor2) {
        localStorage.removeItem('lightColor2');
        localStorage.setItem('lightColor2', this.color.lightColor2!);
      }
      if (this.color.lightColor3 !== this.localColor.lightColor3) {
        localStorage.removeItem('lightColor3');
        localStorage.setItem('lightColor3', this.color.lightColor3!);
      }
      if (this.color.lightColor4 !== this.localColor.lightColor4) {
        localStorage.removeItem('lightColor4');
        localStorage.setItem('lightColor4', this.color.lightColor4!);
      }
    });
  }

  getLocalColors(localColor: Color): void {
    if (
      localStorage.getItem('lightColor1') != null &&
      localStorage.getItem('lightColor2') != null &&
      localStorage.getItem('lightColor3') != null &&
      localStorage.getItem('lightColor4') != null
    ) {
      localColor.lightColor1 = localStorage.getItem('lightColor1')!;
      localColor.lightColor2 = localStorage.getItem('lightColor2')!;
      localColor.lightColor3 = localStorage.getItem('lightColor3')!;
      localColor.lightColor4 = localStorage.getItem('lightColor4')!;
    } else {
      localColor.lightColor1 = '#007bff';
      localColor.lightColor2 = '#6c757d';
      localColor.lightColor3 = '#ffffff';
      localColor.lightColor4 = '#6c757d';
    }
  }
}
