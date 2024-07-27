import { useState } from 'react';
import './UpdateModal.css';
import { Translations } from '../interfaces/translations.interface';
import { create } from '../services/words';
import CreateModal from './CreateModal';

interface CreateModalProps {
  fetchWords: () => void;
}

const CreateWord = ({ fetchWords }: CreateModalProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (title: string, translations: Translations) => {
    const token = localStorage.getItem("token")
    try {
      if (token && title && Object.keys(translations).length) {
        await create(token, title, translations);
        await fetchWords();
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error updating word:', error);
    }
  };

  const handleOpen = () => {
    setShowModal(true);
  };

  return (
    <div >
      <button className="update" onClick={() => handleOpen()}>Create Word</button>
      {showModal && (
        <CreateModal
        show={showModal}
        onClose={handleCloseModal}
        onSave={handleSubmit}
        />
      )}
    </div>
  );
};

export default CreateWord;
