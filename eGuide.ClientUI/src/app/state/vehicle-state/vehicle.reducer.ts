import { createReducer, on } from '@ngrx/store';
import * as VehicleActions from './vehicle.actions';
import { Vehicle } from 'src/app/models/vehicle';


export const initialState: { activeVehicle: Vehicle | null } = {
  activeVehicle: null,
};

export const vehicleReducer = createReducer(
  initialState,
  on(VehicleActions.setActiveVehicle, (state, { activeVehicle }) => ({
    ...state,
    activeVehicle,
  }))
);
