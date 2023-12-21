import { createAction } from '@ngrx/store';

export const setThemeData = createAction(
  '[Theme] Set Theme Data',
  (theme: any) => ({ theme })
);
