import { createSelector } from '@ngrx/store';
// print the serviceEditData to the console
export const selectServiceEditData = createSelector(
  (state: any) => state.serviceEditData,
  (serviceEditData: any) => serviceEditData
);
