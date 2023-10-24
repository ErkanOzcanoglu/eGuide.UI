import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  
  currentPage: string = 'user-settings'; // Varsayılan olarak kullanıcı ayarları sayfasını göster

  showPage(page: string) {
    this.currentPage = page;
  }
}
