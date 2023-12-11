// language.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';


export const selectLanguage = (state: any) =>
 state.language;
