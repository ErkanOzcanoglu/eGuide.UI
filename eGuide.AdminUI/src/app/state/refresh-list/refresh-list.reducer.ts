import { createReducer, on } from '@ngrx/store';
import { setRefresh } from './refresh-list.action';

export const initialRefreshState = {
  refresh: false,
};

export const refreshReducer = createReducer(
  initialRefreshState,
  on(setRefresh, (state, { refresh }) => ({ ...state, refresh }))
);
