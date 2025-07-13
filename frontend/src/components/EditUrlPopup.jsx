import React, { useEffect, useState } from 'react'
import { getOriginalUrl } from '../api/api';

const EditUrlPopup = ({ shortCode, onClose, onSubmit }) => {
  const [urlData, setUrlData] = useState({
    url: '',
    shortCode: '',
    accessCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getOriginalUrl(shortCode)
      .then(data => {
        if (!mounted) return;
        setUrlData(data);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load URL data.');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false };
  }, [shortCode]);

  const handleSubmit = () => {
    onSubmit(urlData.url);
  };

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Your URL</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <label className="block mb-2">
          Long URL
          <input
            type="text"
            value={urlData.url}
            onChange={e => setUrlData({ ...urlData, url: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </label>

        <div className="flex gap-3 mb-4">
          <label className="flex-1 block">
            Short Code
            <input
              type="text"
              value={urlData.shortCode}
              disabled
              className="w-full p-2 border rounded bg-gray-100 opacity-60"
            />
          </label>
          <label className="flex-1 block">
            Hits
            <input
              type="text"
              value={urlData.accessCount}
              disabled
              className="w-full p-2 border rounded bg-gray-100 opacity-60"
            />
          </label>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUrlPopup;
