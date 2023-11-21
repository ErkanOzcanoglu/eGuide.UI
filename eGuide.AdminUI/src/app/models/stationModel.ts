import { StationChargingUnit } from './stationSocket';

export class StationModel {
  id = '';
  name = '';
  stationChargingUnits?: StationChargingUnit[] = [];
}
