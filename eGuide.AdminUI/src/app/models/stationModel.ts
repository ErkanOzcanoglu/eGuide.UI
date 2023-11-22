import { StationChargingUnit } from './stationSocket';

export class StationModel {
  id = '';
  name = '';
  stationsChargingUnits?: StationChargingUnit[] = [];
}
