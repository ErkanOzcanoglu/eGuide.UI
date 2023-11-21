import { Component } from '@angular/core';
import { UserStationService } from 'src/app/services/user-station.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent {
  constructor(private userStationService: UserStationService) { 
  }
}
