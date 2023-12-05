import { createAction, props } from '@ngrx/store';
import { Vehicle } from '../models/vehicle';


export const setActiveVehicle = createAction(
  '[Vehicle] Set Active Vehicle',
  props<{ activeVehicle: Vehicle }>()

   // (activeVehicle: any) => ({ activeVehicle})
);

