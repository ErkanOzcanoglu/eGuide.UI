import { Component, VERSION } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Station } from 'src/app/models/station';
import { UserStationService } from 'src/app/services/user-station.service';
import { ColorHelper } from '../../generic-helper/color/color-helper';
import { Color, ThemeColor } from 'src/app/models/color';
import { TranslateService } from '@ngx-translate/core';
import { LogHelper } from '../../generic-helper/log/log-helper';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
  providers: [ColorHelper, LogHelper],
})
export class FavouritesComponent {
  stations: Station[] = [];
  color: ThemeColor = new ThemeColor();
  constructor(
    private userStationService: UserStationService,
    private toastr: ToastrService,
    private colorHelper: ColorHelper,
    private logHelper: LogHelper,
    public translateService: TranslateService
  ) {this.translateService.addLangs(['tr', 'en']);
    this.translateService.setDefaultLang('en'); // Varsayılan dil İngilizce
    this.translateService.use('en'); // Başlangıçta İngilizce olarak kullan
  }

  ngOnInit(): void {
    // Sayfa yüklendiğinde servisi çağır
    const token = localStorage.getItem('authToken');
    if (token !== null) this.getStationProfiles(token); // Kullanıcı kimliğinizi buraya ekleyin
    this.getColor();
  }
  //dil değişimi

  public onChange(selectedLanguage: string): void {
    this.translateService.use(selectedLanguage);
  }
  //dil değişimi

  getColor(): void {
    this.colorHelper.getLocalColors(this.color);
  }

  getStationProfiles(userId: string): void {
    this.userStationService.getStationProfiles(userId).subscribe(
      (stations: Station[]) => {
        this.stations = stations;
      },
      (error) => {
        this.logHelper.errorProcess('getStationProfiles', error);
        console.error('Error fetching station profiles:', error);
      }
    );
  }

  onDeleteStationProfile(id: any): void {
    this.userStationService.deleteStationProfile(id).subscribe(
      () => {
        const token = localStorage.getItem('authToken');
        if (token !== null) this.getStationProfiles(token);
      },
      (error) => {
        this.logHelper.errorProcess('deleteStationProfile', error);
        console.error('Error deleting station profile:', error);
      }
    );
  }
}
