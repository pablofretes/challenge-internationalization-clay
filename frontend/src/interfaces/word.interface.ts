import { Translations } from "./translations.interface";

export interface Word {
  uuid: string;
  translations: Translations
  defaultLanguage: 'en' | 'es' | 'fr' | 'de';
}