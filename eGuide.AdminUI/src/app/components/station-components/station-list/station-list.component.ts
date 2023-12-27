import { Model } from 'src/app/models/stationInformationModel';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { setStationEditData } from 'src/app/state/station-edit-data/station-edit-data.action';
import { StationService } from 'src/app/services/station.service';
import { Station } from 'src/app/models/station';
import { Router } from '@angular/router';
import { ChargingUnit } from 'src/app/models/charging-unit';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css'],
})
export class StationListComponent implements OnInit {
  socket?: string;
  stationInfo?: Station;
  selectedItem?: string;
  searchText!: string;

  showList = false;

  models: Model[] = [];
  socketArray: ChargingUnit[] = [];
  stations: Station[] = [];

  page?: number = 1;

  toggleList() {
    this.showList = !this.showList;
  }

  onSearchInput() {
    // If searchText is not empty, set the current page to 1
    if (this.searchText && this.searchText.trim() !== '') {
      this.page = 1;
    }
  }

  constructor(
    private stationService: StationService,
    private toastr: ToastrService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.getStations();
    this.getStaInfo();
  }

  getStaInfo() {
    this.stationService.getStations().subscribe((response) => {
      this.stations = response;
    });
  }

  deleteStation(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.stationService.deleteStation(id).subscribe({
          next: () => {
            this.toastr.success('Deleted successfully');
            this.stationService.clearCache().subscribe({
              next: () => {
                this.getStaInfo();
                Swal.fire({
                  title: 'Deleted!',
                  text: 'Your file has been deleted.',
                  icon: 'success',
                });
              },
            });
          },
          error: (err) => this.toastr.error(err, 'Error'),
        });
      }
    });
  }

  editStation(model: Station): void {
    this.store.dispatch(setStationEditData({ stationEditData: model }));
  }

  viewStationDetails(stationId: string) {
    this.router.navigate(['/station-profile', stationId]);
  }
}
