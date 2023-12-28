import { createReducer, on } from '@ngrx/store';
import { setRefresh } from './refresh-list.action';

export interface RefreshState {
  refresh: boolean;
}

export const setRefreshReducer = createReducer(
  { refresh: false },
  on(setRefresh, (state, { refresh }) => ({ ...state, refresh }))
);
