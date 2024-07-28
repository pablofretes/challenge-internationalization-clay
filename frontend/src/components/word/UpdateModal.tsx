import { useState, useEffect, ChangeEvent } from 'react';
import './UpdateModal.css';
import { Word } from '../../interfaces/word.interface';
import { Translations } from '../../interfaces/translations.interface';

interface UpdateModalProps {
  show: boolean;
  onClose: () => void;
  word: Word | null;
  onSave: (uuid: string, { translations, defaultLanguage }: { translations: Translations, defaultLanguage: 'en' | 'es' | 'fr' | 'de' }) => void;
}

const UpdateModal = ({ show, onClose, word, onSave }: UpdateModalProps) => {
  const [defaultLang, setDefaultLang] = useState<'en' | 'fr' | 'de' | 'es'>('en');
  const [translations, setTranslations] = useState<Translations>({
    en: '',
    fr: '',
    de: '',
    es: '',
  });

  useEffect(() => {
    if (word) {
      setTranslations(word.translations);
    }
  }, [word]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTranslations({
      ...translations,
      [name]: value,
    });
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDefaultLang(e.target.value as 'en' | 'fr' | 'de' | 'es');
  };

  const handleSubmit = () => {
    if (word) onSave(word.uuid, { translations, defaultLanguage: defaultLang });
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Update Word</h2>
        <div className="form-group">
          <label>English</label>
          <input
            type="text"
            name="en"
            value={translations.en}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>French</label>
          <input
            type="text"
            name="fr"
            value={translations.fr}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>German</label>
          <input
            type="text"
            name="de"
            value={translations.de}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Spanish</label>
          <input
            type="text"
            name="es"
            value={translations.es}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <span>DEFAULT LANGUAGE</span>
          <div className="language-selector">
            <select id="language" value={defaultLang} onChange={handleLanguageChange}>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="es">Spanish</option>
            </select>
          </div>
        </div>
        <div className="modal-actions">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
