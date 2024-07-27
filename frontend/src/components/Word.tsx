import { ChangeEvent, useState } from "react";
import { Word as WordInterface } from "../interfaces/word.interface"
import UpdateModal from "./UpdateModal";
import { Translations } from "../interfaces/translations.interface";
import { remove, update } from "../services/words";
import "../pages/words/WordList.css"

function Word ({ word, fetchWords }: { word: WordInterface, fetchWords: () => void }) {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'fr' | 'de' | 'es'>('en');
  const [selectedWord, setSelectedWord] = useState<WordInterface | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const token = localStorage.getItem('token') as string

  const handleRemove = async (uuid: string) => {
    try {
      await remove(token, uuid);
      fetchWords();
      handleCloseModal();
    } catch (error) {
      console.error('Error removing word:', error);
    }
  }

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value as 'en' | 'fr' | 'de' | 'es');
  };

  const handleSave = async (uuid: string, updatedTranslations: Translations) => {
    try {
      if (token && uuid && Object.keys(updatedTranslations).length)
      await update(token, uuid, updatedTranslations);
      await fetchWords();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating word:', error);
    }
  };

  const handleUpdate = (word: WordInterface) => {
    setSelectedWord(word);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedWord(null);
  };

  const capitalize = (string: string) => {
    if (string) return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <li className="word-list-item">
      <span>{capitalize(word.translations[selectedLanguage]!)}</span>
      <button className="update" onClick={() => handleUpdate(word)}>Update</button>
      <button className="delete" onClick={() => handleRemove(word.uuid)}>Delete</button>
      <div className="language-selector">
        <select id="language" value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="es">Spanish</option>
        </select>
      </div>
      {showModal && (
        <UpdateModal
          show={showModal}
          onClose={handleCloseModal}
          word={selectedWord}
          onSave={handleSave}
        />
      )}
    </li>
  )
}

export default Word