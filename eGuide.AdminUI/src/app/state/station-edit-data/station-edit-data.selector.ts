import { createSelector } from '@ngrx/store';

export const selectStationEditData = createSelector(
  (state: any) => state.stationEditData,
  (stationEditData) => stationEditData.stationEditData
);
