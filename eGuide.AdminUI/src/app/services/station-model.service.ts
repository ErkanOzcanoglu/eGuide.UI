import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { StationModel } from './../models/stationModel';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StationModelService {
  constructor(private http: HttpClient, private router: Router) {}

  createStationModel(stationModel: StationModel): Observable<StationModel> {
    return this.http.post<StationModel>(
      `${environment.apiUrl}/StationModel`,
      stationModel,
      {
        responseType: 'json',
      }
    );
  }

  updateStationModel(
    id: string,
    stationModel: StationModel
  ): Observable<StationModel> {
    return this.http.put<StationModel>(
      `${environment.apiUrl}/StationModel?id=${id}`,
      stationModel,
      {
        responseType: 'json',
      }
    );
  }

  deleteStationModel(id: string) {
    return this.http.delete(`${environment.apiUrl}/StationModel/${id}`);
  }

  hardDeleteStationModel(id: string) {
    return this.http.delete(`${environment.apiUrl}/StationModel/${id}`);
  }
}
