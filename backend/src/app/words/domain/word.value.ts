import { v4 as uuid } from "uuid";
import { WordEntity } from "./entities/word.entity";
import { TranslationEntity } from "./entities/translation.entity";

export class WordValue implements WordEntity {
  uuid: string;
  title: string;
  translations: TranslationEntity;

  constructor({ translations, title }: Omit<WordEntity, "uuid">) {
    this.uuid = uuid();
    this.title = title
    this.translations = translations
  }
}