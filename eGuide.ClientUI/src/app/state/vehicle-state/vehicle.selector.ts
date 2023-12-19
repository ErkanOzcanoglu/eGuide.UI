import { createFeatureSelector, createSelector } from '@ngrx/store';


export const selectActiveVehicle = (state: any) =>
  state.activeVehicle?.activeVehicle;
