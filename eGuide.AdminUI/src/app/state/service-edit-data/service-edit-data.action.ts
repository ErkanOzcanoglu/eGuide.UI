import { createAction } from '@ngrx/store';

export const setServiceEditData = createAction(
  '[Service Edit Data] Set Service Edit Data',
  (serviceEditData: any) => ({ serviceEditData })
  // print the serviceEditData to the console
);
