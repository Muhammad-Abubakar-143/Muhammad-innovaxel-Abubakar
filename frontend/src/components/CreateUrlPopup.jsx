// CreateUrlPopup.js
import React, { useState } from 'react';
import { createShortUrl } from '../api/api';

const CreateUrlPopup = ({ onClose, onSubmit,  onCreated = () => {}  }) => {
    const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const created = await createShortUrl(url.trim());
      onSubmit(created);
      onCreated();
      setUrl('');
      onClose();
    } catch (err) {
      console.error('Create URL error:', err);
      setError('Failed to create short URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={handleOverlayClick}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <h2 className="text-xl font-semibold mb-4">Create Short URL</h2>
        <input
          type="text"
          placeholder="Enter a long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600">
           {loading ? 'Generating...' : 'Generate Short URL'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUrlPopup;
