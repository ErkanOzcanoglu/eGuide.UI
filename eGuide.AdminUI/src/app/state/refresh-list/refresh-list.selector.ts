import { createSelector } from '@ngrx/store';

export const getRefresh = createSelector(
  (state: any) => state.refresh,
  (refresh) => refresh.refresh
);
