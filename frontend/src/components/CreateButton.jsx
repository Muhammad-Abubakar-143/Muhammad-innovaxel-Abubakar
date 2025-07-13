import React, { useState } from 'react';
import CreateUrlPopup from './CreateUrlPopup';
import { createShortUrl } from '../api/api';

const CreateButton = ({ onCreate }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async (url) => {
    setError(null);
    try {
      const created = await createShortUrl(url.trim());
      onCreate(created); 
      setShowPopup(false);
    } catch (err) {
      console.error('Create failed:', err);
      setError('Failed to create short URL.');
    }
  };

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        className='bg-indigo-500 px-3 py-1 rounded-full text-white cursor-pointer hover:bg-indigo-700 duration-300 ease-in-out font-normal font-sans flex items-center gap-1'
      >
         Create New
      </button>

      {showPopup && (
        <CreateUrlPopup
          onClose={() => setShowPopup(false)}
          onSubmit={handleCreate}
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
};

export default CreateButton;
