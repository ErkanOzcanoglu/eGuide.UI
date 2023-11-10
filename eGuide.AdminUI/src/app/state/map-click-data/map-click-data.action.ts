import { createAction, props } from '@ngrx/store';

export interface MapState {
  clickedData: {
    address: string;
    lat: number;
    lng: number;
  };
  formAddressData: {
    address: string;
    lat: number;
    lng: number;
  };
}

export const setClickedData = createAction(
  '[Map] Set Clicked Data',
  props<{ clickedData: any }>()
);

export const setFormAddressData = createAction(
  '[Map] Set Form Address Data',
  props<{ formAddressData: any }>()
);
