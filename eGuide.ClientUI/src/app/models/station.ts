import { StationModel } from './stationModel';
import { UserStation } from './user-station';

export class Station {
  id = '';
  name = '';
  address = '';
  latitude: number | undefined;
  longitude: number | undefined;
  stationModeId = '';
  stationModel?: StationModel;
  userStations: UserStation[] = [];
  distance: number | undefined;
}
