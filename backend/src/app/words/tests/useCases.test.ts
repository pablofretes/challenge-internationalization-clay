import { WordUseCases } from "../application/wordUseCases";
import { MockRepositoryImplementation } from "../infrastructure/repositories/mock.repository";
import { expect, describe, it } from '@jest/globals';

describe('Word use cases', () => {
  const mockRepositoryImplementation = new MockRepositoryImplementation()
  const useCases = new WordUseCases(mockRepositoryImplementation);
  it('should create a word', async () => {
    const word = {
      translations: {
      "es": "hola",
      "en": "hello",
      "fr": "salut",
      "de": "hallo"
    }};
    const createdWord = await useCases.createWord(word)

    expect(createdWord).toBeDefined();
    expect(createdWord?.uuid).toBeDefined();
  });

  it('should get all words', async () => {
    const words = await useCases.findAll()
    const word = {
      translations: {
      "es": "hola",
      "en": "hello",
      "fr": "salut",
      "de": "hallo"
    }};

    expect(words).toBeDefined();
    if (words) {
      expect(words[0].translations).toEqual(word.translations);
    }
  });

  it('should update a word', async () => {
    const words = mockRepositoryImplementation.words
    const uuid = words[0].uuid 
    const translations = {
      "es": "hooooola",
      "en": "hello",
      "fr": "salut",
      "de": "hallo"
    }
    const updatedWord = await useCases.updateWord(uuid, {translations})

    expect(updatedWord).toBeDefined();
    expect(updatedWord?.uuid).toBeDefined();
    expect(updatedWord?.translations.es).toBe("hooooola");
  });

  it('should delete a word', async () => {
    const words = mockRepositoryImplementation.words
    const uuid = words[0].uuid 
    const updatedWord = await useCases.deleteWord(uuid)

    expect(updatedWord).toEqual(true);
  });
});