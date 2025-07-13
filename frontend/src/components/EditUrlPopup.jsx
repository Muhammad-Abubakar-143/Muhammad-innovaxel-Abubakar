import React, { useEffect, useState } from 'react'
import { getOriginalUrl } from '../api/api';

const EditUrlPopup = ({ onClose, onSubmit, shortCode }) => {
   const [url, setUrl] = useState('');
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   console.log(url)
  
    const handleSubmit = () => {
      if (url.trim()) {
        onSubmit(url?.url);
        setUrl('');
      }
    };
  
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getOriginalUrl(shortCode);
        setUrl(data);
        
      } catch (err) {
        setError('Failed to load URL data.', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [shortCode]);


  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <p className="text-white">Loading...</p>
      </div>
    );
  }
  
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={handleOverlayClick}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Edit Your URL</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <input
            type="text"
            placeholder="Enter a long URL"
            value={url?.url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <div className='flex justify-between items-center gap-3'>
            <input
            type="text"
            placeholder="Enter a long URL"
            value={url?.shortCode}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border rounded mb-4 opacity-50"
            disabled
          />
          <input
            type="text"
            placeholder="Enter a long URL"
            value={url?.accessCount}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border rounded mb-4 opacity-50"
            disabled
          />

          </div>
          <div className="flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
              Cancel
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600">
               Update
            </button>
          </div>
        </div>
      </div>
  )
}

export default EditUrlPopup