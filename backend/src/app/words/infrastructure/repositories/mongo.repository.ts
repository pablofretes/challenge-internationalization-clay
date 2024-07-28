import { TranslationEntity } from "../../domain/entities/translation.entity";
import { WordEntity } from "../../domain/entities/word.entity";
import { WordRepository } from "../../domain/word.repository";
import WordModel from "../word.schema"

export class MongoRepository implements WordRepository {
  async findAll(): Promise<WordEntity[] | null> {
    try {
      const words = await WordModel.find({})
      if (!words) return null
      return words
    } catch (error) {
      return null
    }
  }

  async findWordById(uuid: string): Promise<WordEntity | null> {
    try {
      const word = await WordModel.findOne({ uuid })
      if (!word) return null
      return word
    } catch (error) {
      return null
    }
  }

  async createWord(wordIn: WordEntity): Promise<WordEntity | null> {
    try {
      const word = await WordModel.create(wordIn)
      if (!word) return null
      return word
    } catch (error) {
      return null
    }
  }

  async updateWord(uuid: string, { translations, defaultLanguage }: { translations?: TranslationEntity, defaultLanguage?: string }): Promise<WordEntity | null> {
    try {
      const updateData: { $set?: { translations?: Partial<TranslationEntity>, defaultLanguage?: string } } = {}
      if (translations && (translations.en || translations.de || translations.fr || translations.es) || defaultLanguage) {
        updateData.$set = {}
        updateData.$set.translations = {}
        if (translations?.en) updateData.$set.translations.en = translations.en
        if (translations?.es) updateData.$set.translations.es = translations.es
        if (translations?.fr) updateData.$set.translations.fr = translations.fr
        if (translations?.de) updateData.$set.translations.de = translations.de
        if (defaultLanguage) updateData.$set.defaultLanguage = defaultLanguage
      }

      const word = await WordModel.findOneAndUpdate({ uuid }, updateData, { new: true })
      if (!word) return null
      return word
    } catch (error) {
      return null
    }
  }

  async deleteWord(uuid: string): Promise<true | null> {
    try {
      await WordModel.findOneAndDelete({ uuid })
      return true
    } catch (error) {
      return null
    }
  }
}