import { createSelector } from '@ngrx/store';

export const getStationEditData = createSelector(
  (state: any) => state.stationEditData,
  (stationEditData) => stationEditData.stationEditData
);
