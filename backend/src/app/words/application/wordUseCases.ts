import { TranslationEntity } from "../domain/entities/translation.entity";
import { WordEntity } from "../domain/entities/word.entity";
import { WordRepository } from "../domain/word.repository";
import { WordValue } from "../domain/word.value";

export class WordUseCases {
  constructor(
    private readonly wordRepository: WordRepository,
  ) {}

  public findAll = async () => {
    const word = await this.wordRepository.findAll()
    if (!word) return null
    return word
  }

  public findWordById = async (uuid: string) => {
    const word = await this.wordRepository.findWordById(uuid)
    if (!word) return null
    return word
  }

  public createWord = async ({ translations }: Omit<WordEntity, "uuid">) => {
    const wordValue = new WordValue({ translations })
    const word = await this.wordRepository.createWord(wordValue)
    if (!word) return null
    return word
  }


  public updateWord = async (uuid: string, { translations, defaultLanguage }: { translations?: TranslationEntity, defaultLanguage?: string }) => {
    const word = await this.wordRepository.updateWord(uuid, { translations, defaultLanguage })
    if (!word) return null
    return word
  }

  public deleteWord = async (uuid: string) => {
    const word = await this.wordRepository.deleteWord(uuid)
    if (!word) return null
    return word
  }
}