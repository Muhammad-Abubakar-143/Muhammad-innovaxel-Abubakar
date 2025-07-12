import React, { useState } from 'react';
import CreateUrlPopup from './CreateUrlPopup';

const CreateButton = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleCreate = (url) => {
    // Call your POST API to create short URL
    console.log('Creating short URL for:', url);
    setShowPopup(false);
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
