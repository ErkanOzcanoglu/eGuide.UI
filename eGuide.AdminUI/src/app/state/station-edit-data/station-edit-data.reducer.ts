import { createReducer, on } from '@ngrx/store';
import { Station } from 'src/app/models/station';
import { setStationEditData } from './station-edit-data.action';
export const initialState = {
  stationEditData: new Station(),
};
export const stationEditDataReducer = createReducer(
  initialState,
  on(setStationEditData, (state, { stationEditData }) => ({
    ...state,
    stationEditData,
  }))
);
