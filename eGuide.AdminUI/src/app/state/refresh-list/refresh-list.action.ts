import { createAction } from '@ngrx/store';

export interface RefreshState {
  refresh: boolean;
}

export const setRefresh = createAction(
  '[Refresh List] Set Refresh',
  (refresh: boolean) => ({ refresh })
);
