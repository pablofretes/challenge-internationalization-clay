import { Translations } from "./translations.interface";

export interface Word {
  title: string;
  uuid: string;
  translations: Translations
}