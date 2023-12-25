import { createAction, props } from '@ngrx/store';

interface ClickedData {
  address: string;
  lat: number;
  lng: number;
}

interface FormAddressData {
  address: string;
  lat: number;
  lng: number;
}
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
  props<{ clickedData: ClickedData }>()
);

export const setFormAddressData = createAction(
  '[Map] Set Form Address Data',
  props<{ formAddressData: FormAddressData }>()
);
