// language.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as LanguageActions from './language.action';

export const initialState: { language: string | null } = {
  language: 'en', // Varsayılan dil
};

export const languageReducer = createReducer(
  initialState,
  on(LanguageActions.setLanguage, (state, { language }) => {
    return { ...state, language };
  })
);
