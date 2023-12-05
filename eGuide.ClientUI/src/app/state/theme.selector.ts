import { createSelector } from '@ngrx/store';

export const selectThemeData = createSelector(
  (state: any) => state.theme,
  (theme) => theme.theme
);
