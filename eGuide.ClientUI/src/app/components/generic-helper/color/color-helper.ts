import { Color, ThemeColor } from 'src/app/models/color';
import { Injectable } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';
@Injectable({
  providedIn: 'root',
})
export class ColorHelper {
  constructor(private colorService: ColorService) {}
  color = new Color();
  localColor = new Color();
  themeColor = new ThemeColor();

  getColors() {
    this.colorService.getColors().subscribe((colors) => {
      this.color = colors[0];
      const theme = localStorage.getItem('theme');

      if (theme === 'light') {
        localStorage.removeItem('color1');
        localStorage.setItem('color1', this.color.lightColor1!);
        localStorage.removeItem('color2');
        localStorage.setItem('color2', this.color.lightColor2!);
        localStorage.removeItem('color3');
        localStorage.setItem('color3', this.color.lightColor3!);
        localStorage.removeItem('color4');
        localStorage.setItem('color4', this.color.lightColor4!);
      } else if (theme === 'dark') {
        localStorage.removeItem('color1');
        localStorage.setItem('color1', this.color.darkColor1!);
        localStorage.removeItem('color2');
        localStorage.setItem('color2', this.color.darkColor2!);
        localStorage.removeItem('color3');
        localStorage.setItem('color3', this.color.darkColor3!);
        localStorage.removeItem('color4');
        localStorage.setItem('color4', this.color.darkColor4!);
      }
    });
  }

  getLocalColors(localColor: ThemeColor): void {
    setTimeout(() => {
      if (
        localStorage.getItem('color1') != null &&
        localStorage.getItem('color2') != null &&
        localStorage.getItem('color3') != null &&
        localStorage.getItem('color4') != null
      ) {
        localColor.color1 = localStorage.getItem('color1')!;
        localColor.color2 = localStorage.getItem('color2')!;
        localColor.color3 = localStorage.getItem('color3')!;
        localColor.color4 = localStorage.getItem('color4')!;
      } else {
        localColor.color1 = '#007bff';
        localColor.color2 = '#6c757d';
        localColor.color3 = '#ffffff';
        localColor.color4 = '#6c757d';
      }
    }, 50);
  }
}
