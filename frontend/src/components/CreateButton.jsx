import React, { useState } from 'react';
import CreateUrlPopup from './CreateUrlPopup';
import { createShortUrl } from '../api/api';

const CreateButton = ({ onCreated = () => {} }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleCreate = async (url) => {
    try {
      await createShortUrl(url); // API call
      onCreated();         // List reload
    } catch (err) {
      console.error('Failed to create URL:', err);
    } finally {
      setShowPopup(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        className='bg-indigo-500 px-3 py-1 rounded-full text-white cursor-pointer hover:bg-indigo-700 duration-300 ease-in-out font-normal font-sans'
      >
        Create New
      </button>

      {showPopup && (
        <CreateUrlPopup
          onClose={() => setShowPopup(false)}
          onSubmit={handleCreate}
        />
      )}
    </>
  );
};

export default CreateButton;
