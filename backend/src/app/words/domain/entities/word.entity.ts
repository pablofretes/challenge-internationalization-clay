import { TranslationEntity } from "./translation.entity";

export interface WordEntity {
  title: string;
  uuid: string;
  translations: TranslationEntity;
}