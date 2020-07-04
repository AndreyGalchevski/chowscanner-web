import React, {
  createContext,
  useReducer,
  FunctionComponent,
  useContext,
  useCallback,
} from "react";

import translations from "./translations";
import { LanguageCode, Word } from "./types";

const localStorageKey = "__chowScannerLang__";

const getTranslate = (langCode: LanguageCode) => (word: Word) =>
  translations[langCode][word] || word;

export interface I18nState {
  languageCode: LanguageCode;
  translate: (word: Word) => string;
}

export interface I18nActions {
  setLanguage: (languageCode: LanguageCode) => void;
}

const I18nStateContext = createContext<I18nState | undefined>(undefined);
const I18nActionsContext = createContext<I18nActions | undefined>(undefined);

const i18nReducer = (
  currentState: I18nState,
  action: { type: string; payload?: Partial<I18nState> }
): I18nState => ({ ...currentState, ...action.payload });

const initialState: I18nState = {
  languageCode: (localStorage.getItem(localStorageKey) || "en") as LanguageCode,
  translate: getTranslate(
    (localStorage.getItem(localStorageKey) || "en") as LanguageCode
  ),
};

export const I18nProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(i18nReducer, initialState);

  const setLanguage = (languageCode: LanguageCode) => {
    localStorage.setItem(localStorageKey, languageCode);
    dispatch({
      type: "setLanguage",
      payload: {
        languageCode: languageCode,
        translate: getTranslate(languageCode),
      },
    });
  };

  const actions: I18nActions = {
    setLanguage: useCallback(setLanguage, []),
  };

  return (
    <I18nStateContext.Provider value={state}>
      <I18nActionsContext.Provider value={actions}>
        {children}
      </I18nActionsContext.Provider>
    </I18nStateContext.Provider>
  );
};

export const useI18nState = () => {
  const context = useContext(I18nStateContext);
  if (context === undefined) {
    throw new Error("useI18nState must be used within a I18nProvider");
  }
  return context;
};

export const useI18nActions = () => {
  const context = useContext(I18nActionsContext);
  if (context === undefined) {
    throw new Error("useI18nActions must be used within a I18nProvider");
  }
  return context;
};
