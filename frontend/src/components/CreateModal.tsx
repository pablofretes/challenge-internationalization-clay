import { useState, ChangeEvent } from 'react';
import { Translations } from '../interfaces/translations.interface';
import './UpdateModal.css';

interface CreateModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (title: string, translations: Translations) => void;
}

const CreateModal = ({ show, onClose, onSave }: CreateModalProps) => {
  const [title, setTitle] = useState<string>('')
  const [translations, setTranslations] = useState<Translations>({
    en: '',
    fr: '',
    de: '',
    es: '',
  });

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const {  value } = e.target;
    setTitle(value)
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTranslations({
      ...translations,
      [name]: value,
    });
  };

  if (!show) {
    return null;
  }

  const handleSubmit = () => {
    onSave(title, translations);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create Word</h2>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChangeTitle}
          />
        </div>
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
        <div className="modal-actions">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
