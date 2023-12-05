import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Vehicle } from '../models/vehicle';



export const selectActiveVehicle = (state: any) =>
  state.activeVehicle?.activeVehicle;