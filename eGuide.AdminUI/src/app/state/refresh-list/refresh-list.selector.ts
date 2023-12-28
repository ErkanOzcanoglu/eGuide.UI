import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RefreshState } from './refresh-list.reducer';

export const selectRefreshState =
  createFeatureSelector<RefreshState>('refresh');

export const selectRefresh = createSelector(
  selectRefreshState,
  (state: RefreshState) => state.refresh
);
