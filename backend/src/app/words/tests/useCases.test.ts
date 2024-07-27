import { WordUseCases } from "../application/wordUseCases";
import { MockRepositoryImplementation } from "../infrastructure/repositories/mock.repository";
import { expect, describe, it } from '@jest/globals';

describe('Word use cases', () => {
  const mockRepositoryImplementation = new MockRepositoryImplementation()
  const useCases = new WordUseCases(mockRepositoryImplementation);
  it('should create a word', async () => {
    const word = {
      title: "greetings",
      translations: {
      "es": "hola",
      "en": "hello",
      "fr": "salut",
      "de": "hallo"
    }};
    const createdWord = await useCases.createWord(word)

    expect(createdWord).toBeDefined();
    expect(createdWord?.uuid).toBeDefined();
    expect(createdWord?.title).toBe(word.title);
  });

  it('should get all words', async () => {
    const words = await useCases.findAll()
    const word = {
      title: "greetings",
      translations: {
      "es": "hola",
      "en": "hello",
      "fr": "salut",
      "de": "hallo"
    }};

    expect(words).toBeDefined();
    if (words) {
      expect(words[0].title).toEqual(word.title);
      expect(words[0].translations).toEqual(word.translations);
    }
  });

  it('should get update a word', async () => {
    const title = "greetings"
    const translations = {
      "es": "hooooola",
      "en": "hello",
      "fr": "salut",
      "de": "hallo"
    }
    const updatedWord = await useCases.updateWord(title, translations)

    expect(updatedWord).toBeDefined();
    expect(updatedWord?.uuid).toBeDefined();
    expect(updatedWord?.title).toBe(title);
    expect(updatedWord?.translations.es).toBe("hooooola");
  });

  it('should get update a word', async () => {
    const title = "greetings"
    const translations = {
      "es": "hooooola",
      "en": "hello",
      "fr": "salut",
      "de": "hallo"
    }
    const updatedWord = await useCases.updateWord(title, translations)

    expect(updatedWord).toBeDefined();
    expect(updatedWord?.uuid).toBeDefined();
    expect(updatedWord?.title).toBe(title);
    expect(updatedWord?.translations.es).toBe("hooooola");
  });
});