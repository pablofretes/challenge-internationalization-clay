import { TranslationEntity } from "../../domain/entities/translation.entity";
import { WordEntity } from "../../domain/entities/word.entity";
import { WordRepository } from "../../domain/word.repository";

export class MockRepositoryImplementation implements WordRepository {
  public words: WordEntity[] = [] 

  async findAll(): Promise<WordEntity[] | []> {
    return this.words
  }

  async findWordById(uuid: string): Promise<WordEntity | null> {
    const word = this.words.find((u) => u.uuid === uuid)
    if (!word) return null
    return word
  }

  async createWord(word: WordEntity): Promise<WordEntity | null> {
    this.words.push(word)
    return Promise.resolve(word)
  }

  async updateWord(uuid: string, { translations, defaultLanguage }: { translations?: TranslationEntity, defaultLanguage?: string }): Promise<WordEntity | null> {
    const word = this.words.find((w) => w.uuid === uuid)
    if (!word) return null
    if (translations) word.translations = translations
    if (defaultLanguage) word.defaultLanguage = defaultLanguage
    return Promise.resolve(word)
  }

  async deleteWord(uuid: string): Promise<true | null> {
    const word = this.words.find((w) => w.uuid === uuid)
    if (!word) return null
    this.words.filter((w) => w.uuid !== w.uuid)
    return Promise.resolve(true)
  }
}