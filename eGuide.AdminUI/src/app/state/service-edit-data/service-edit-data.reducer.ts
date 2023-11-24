import { createReducer, on } from '@ngrx/store';
import { setServiceEditData } from './service-edit-data.action';

export const initialServiceState = {
  serviceEditData: {
    id: '',
    name: '',
    description: '',
    image: '',
    layout: 0,
  },
};
// print the serviceEditData to the console
export const serviceEditDataReducer = createReducer(
  initialServiceState,
  on(setServiceEditData, (state, { serviceEditData }) => ({
    ...state,
    ...serviceEditData,
  }))
);
