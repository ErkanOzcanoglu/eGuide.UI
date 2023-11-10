import { createAction } from '@ngrx/store';

export const setStationEditData = createAction(
  '[StationEditData] Set Station Edit Data',
  (stationEditData: any) => ({ stationEditData })
);
