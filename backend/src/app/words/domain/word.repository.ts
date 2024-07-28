import { WordEntity } from "./entities/word.entity";
import { TranslationEntity } from "./entities/translation.entity";

export interface WordRepository {
  findAll(): Promise<WordEntity[] | null>
  findWordById(uuid: string): Promise<WordEntity | null>
  createWord(word: WordEntity): Promise<WordEntity | null>
  updateWord(uuid: string, { translations, defaultLanguage }: { translations?: TranslationEntity, defaultLanguage?: string }): Promise<WordEntity | null>
  deleteWord(uuid: string): Promise<true | null>
}