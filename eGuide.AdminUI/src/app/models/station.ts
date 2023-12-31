import { StationFacility } from './station-facility';
import { StationModel } from './stationModel';

export class Station {
  id = '';
  name = '';
  stationStatus?: number;
  address = '';
  latitude: number | undefined;
  longitude: number | undefined;
  stationModel?: StationModel;
  stationFacilities?: StationFacility[] = [];
}
