export interface Dictionary {
  about: string;
  contact: string;
  edit_spot: string;
  home: string;
  new_spot: string;
  search: string;
  sign_in: string;
  sign_up: string;
}

export type Word = keyof Dictionary;

export interface Translations {
  en: Dictionary;
  es: Dictionary;
  he: Dictionary;
  ru: Dictionary;
}

export type LanguageCode = keyof Translations;
