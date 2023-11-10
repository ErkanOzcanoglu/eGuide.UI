import { createSelector } from '@ngrx/store';

export const getClickedData = createSelector(
  (state: any) => state.map,
  (map) => map.clickedData
);

export const getFormAddressData = createSelector(
  (state: any) => state.map,
  (map) => map.formAddressData
);
