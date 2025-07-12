import React, { useState } from 'react'
import {MdModeEdit} from "react-icons/md"
import EditUrlPopup from './EditUrlPopup';

const EditButton = () => {
    const [showPopup, setShowPopup] = useState(false);
    
      const handleEdit = (url) => {
        // Call your POST API to create short URL
        console.log('Creating short URL for:', url);
        setShowPopup(false);
      };
  return (
    <>
    <MdModeEdit onClick={() => setShowPopup(true)} className='p-2 bg-gray-200 rounded-lg cursor-pointer' size={35}/>

    {showPopup && (
        <EditUrlPopup
          onClose={() => setShowPopup(false)}
          onSubmit={handleEdit}
        />
      )}
    </>
  )
}

export default EditButton