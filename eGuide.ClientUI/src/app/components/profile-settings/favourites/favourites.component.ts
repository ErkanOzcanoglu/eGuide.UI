import { Component, VERSION } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Station } from 'src/app/models/station';
import { UserStationService } from 'src/app/services/user-station.service';
import { ColorHelper } from '../../generic-helper/color/color-helper';
import { Color, ThemeColor } from 'src/app/models/color';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { selectLanguage } from 'src/app/state/language-state/language.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
  providers: [ColorHelper],
})
export class FavouritesComponent {
  stations: Station[] = [];
  color: ThemeColor = new ThemeColor();

  selectedLanguage = '';
  language$: Observable<string>;

  constructor(
    private userStationService: UserStationService,
    private toastr: ToastrService,
    private colorHelper: ColorHelper,
    public translateService: TranslateService,
    private store: Store
  ) {
    this.translateService.addLangs(['tr', 'en']);
    this.translateService.setDefaultLang('en'); // Varsayılan dil İngilizce
    this.translateService.use('en'); // Başlangıçta İngilizce olarak kullan
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit(): void {
    // Sayfa yüklendiğinde servisi çağır
    const token = localStorage.getItem('authToken');
    if (token !== null) this.getStationProfiles(token); // Kullanıcı kimliğinizi buraya ekleyin
    this.getColor();

     this.language$.subscribe((currentState) => {
       this.selectedLanguage = currentState;
       console.log('deneme ngrx search icin', this.selectedLanguage);
       this.translateService.use(this.selectedLanguage);
     });
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
        console.error('Error deleting station profile:', error);
      }
    );
  }
}
