import { createReducer, on } from '@ngrx/store';
import { setThemeData } from './theme.action';

const data = localStorage.getItem('theme');

export const initialThemeState = {
  theme: data ? data : 'light',
};

export const themeReducer = createReducer(
  initialThemeState,
  on(setThemeData, (state, { theme }) => ({
    ...state,
    theme,
  }))
);
