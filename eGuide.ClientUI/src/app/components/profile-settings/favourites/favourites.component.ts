import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Station } from 'src/app/models/station';
import { UserStationService } from 'src/app/services/user-station.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent {
  stations: Station[] = [];
  constructor(
    private userStationService: UserStationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Sayfa yüklendiğinde servisi çağır
    const token = localStorage.getItem('authToken');
    if (token !== null) this.getStationProfiles(token); // Kullanıcı kimliğinizi buraya ekleyin
  }

  getStationProfiles(userId: string): void {
    this.userStationService.getStationProfiles(userId).subscribe(
      (stations: Station[]) => {
        this.stations = stations;
        // İsteğe bağlı: Verileri konsola yazdırabilirsiniz
        //console.log(stations[0].userStations[0].id,"fghf");
      },
      (error) => {
        console.error('Error fetching station profiles:', error);
      }
    );
  }

  onDeleteStationProfile(id:any): void {
    this.userStationService.deleteStationProfile(id).subscribe(
      () => {
        console.log('Station profile deleted successfully.');
        const token = localStorage.getItem('authToken');
        if (token !== null) this.getStationProfiles(token);
      },
      (error) => {
        console.error('Error deleting station profile:', error);
      }
    );
  }
}
