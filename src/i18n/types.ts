import { pl } from './translations/pl';

export type TranslationKey = keyof typeof pl;
export type Language = 'pl' | 'en' | 'de';

export interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}
