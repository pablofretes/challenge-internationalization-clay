import { v4 as uuid } from "uuid";
import { WordEntity } from "./entities/word.entity";
import { TranslationEntity } from "./entities/translation.entity";

export class WordValue implements WordEntity {
  uuid: string;
  translations: TranslationEntity;

  constructor({ translations }: Omit<WordEntity, "uuid">) {
    this.uuid = uuid();
    this.translations = translations
  }
}