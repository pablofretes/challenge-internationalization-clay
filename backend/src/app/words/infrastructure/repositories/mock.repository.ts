import { TranslationEntity } from "../../domain/entities/translation.entity";
import { WordEntity } from "../../domain/entities/word.entity";
import { WordRepository } from "../../domain/word.repository";

export class MockRepositoryImplementation implements WordRepository {
  private readonly words: WordEntity[] = [] 

  async findAll(): Promise<WordEntity[] | []> {
    return this.words
  }

  async findWordById(title: string): Promise<WordEntity | null> {
    const word = this.words.find((u) => u.title === title)
    if (!word) return null
    return word
  }

  async createWord(word: WordEntity): Promise<WordEntity | null> {
    this.words.push(word)
    return Promise.resolve(word)
  }

  async updateWord(uuid: string, translations: TranslationEntity): Promise<WordEntity | null> {
    const word = this.words.find((w) => w.uuid === uuid)
    if (!word) return null
    word.translations = translations
    return Promise.resolve(word)
  }

  async deleteWord(uuid: string): Promise<true | null> {
    const word = this.words.find((w) => w.uuid === uuid)
    if (!word) return null
    this.words.filter((w) => w.uuid !== w.uuid)
    return Promise.resolve(true)
  }
}