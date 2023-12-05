import { Component } from '@angular/core';
import { ColorHelper } from 'src/app/components/generic-helper/color/color-helper';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [ColorHelper],
})
export class SettingsComponent {
  currentPage = 'user-settings';
  color: Color = new Color();

  constructor(private colorHelper: ColorHelper) {}

  ngOnInit(): void {
    this.colorHelper.getLocalColors(this.color);
  }

  showPage(page: string) {
    this.currentPage = page;
  }

  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
