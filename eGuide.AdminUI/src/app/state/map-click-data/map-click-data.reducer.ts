import { createReducer, on } from '@ngrx/store';
import {
  MapState,
  setClickedData,
  setFormAddressData,
} from './map-click-data.action';

export const initialState: MapState = {
  clickedData: {
    address: '',
    lat: 0,
    lng: 0,
  },
  formAddressData: {
    address: '',
    lat: 0,
    lng: 0,
  },
};

export const mapReducer = createReducer(
  initialState,
  on(setClickedData, (state, { clickedData }) => ({
    ...state,
    clickedData,
  })),
  on(setFormAddressData, (state, { formAddressData }) => ({
    ...state,
    formAddressData,
  }))
);
