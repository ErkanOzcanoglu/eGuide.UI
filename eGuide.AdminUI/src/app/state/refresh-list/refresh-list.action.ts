import { createAction } from '@ngrx/store';

export const setRefresh = createAction(
  '[Refresh List] Set Refresh List',
  (refresh: boolean) => ({ refresh })
);
