import { createAction, props } from '@ngrx/store';
import { Vehicle } from 'src/app/models/vehicle';


export const setActiveVehicle = createAction(
  '[Vehicle] Set Active Vehicle',
  props<{ activeVehicle: Vehicle }>()

);
