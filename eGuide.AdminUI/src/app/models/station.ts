import { StationModel } from './stationModel';

export class Station {
  id = '';
  name = '';
  address = '';
  latitude: number | undefined;
  longitude: number | undefined;
  stationModel?: StationModel;
}
