import { TranslationEntity } from "./translation.entity";

export interface WordEntity {
  uuid: string;
  defaultLanguage?: string;
  translations: TranslationEntity;
}