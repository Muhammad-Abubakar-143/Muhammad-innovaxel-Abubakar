import React, { useState } from 'react'
import {MdModeEdit} from "react-icons/md"
import EditUrlPopup from './EditUrlPopup';
import { updateShortUrl } from '../api/api';

const EditButton = ({shortCode, onUpdate}) => {
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState(null)
    
      const handleEdit = async (newUrl) => {
    setError(null);
    try {
      await updateShortUrl(shortCode, newUrl);
      onUpdate();
      setShowPopup(false);
    } catch (err) {
      console.error('Update failed:', err);
      setError('Failed to update URL.');
    }
  };
  return (
    <>
    <MdModeEdit onClick={() => setShowPopup(true)} className='p-2 bg-gray-200 rounded-lg cursor-pointer' size={35}/>

    {showPopup && (
        <EditUrlPopup
          onClose={() => setShowPopup(false)}
          onSubmit={handleEdit}
          shortCode={shortCode}
        />
      )}
       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  )
}

export default EditButton