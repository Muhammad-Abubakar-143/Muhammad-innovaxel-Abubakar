import React, { useEffect, useState } from 'react';
import CreateButton from './CreateButton';
import CopyButton from './CopyButton';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import { deleteShortUrl, getAllShortUrls } from '../api/api';
import ViewButton from './ViewButton';

const AllLinks = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const data = await getAllShortUrls();
      setUrls(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleDelete = async (shortCode) => {
    if (!window.confirm('Are you sure you want to delete this URL?')) return;
    try {
      await deleteShortUrl(shortCode);
      await fetchUrls();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className='bg-white max-w-5xl mx-auto mt-36 shadow-md p-4 rounded-lg'>
      {loading ? (
        <p className='text-center text-gray-500'>Loading...</p>
      ) : error ? (
        <p className='text-center text-red-600'>{error}</p>
      ) : urls.length === 0 ? (
        <div className='h-52 flex justify-center items-center flex-col'>
          <p className='text-gray-700 text-2xl mb-5 text-center'>No URL found.</p>
          <CreateButton onCreated={fetchUrls} />
        </div>
      ) : (
        <div>
          <div className='mb-8 flex justify-between items-center'>
          <h1 className='md:text-4xl text-2xl font-bold font-sans'>URL Shortening</h1>
<CreateButton onCreated={fetchUrls} />
          </div>
          <ul className='space-y-2'>
            {urls.map((url, index) => (
              <li key={index} className='border flex justify-between gap-4 md:gap-0 items-baseline overflow-x-auto md:items-center border-gray-300 p-3 rounded hover:bg-gray-50'>
                <div>
                  <div className='font-semibold'>{url?.shortCode}</div>
                  <div className='text-sm text-gray-600'>{url?.url}</div>
                </div>
                <div>
                  <div className='font-semibold'>Created At</div>
                  <div className='text-sm text-gray-600'>{new Date(url?.createdAt).toLocaleString()}</div>
                </div>
                <div>
                  <div className='font-semibold'>Updated At</div>
                  <div className='text-sm text-gray-600'>{new Date(url?.updatedAt).toLocaleString()}</div>
                </div>
                <div>
                  <div className='font-semibold'>Access Count</div>
                  <div className='text-sm text-gray-600'>{url?.accessCount}</div>
                </div>
                <div>
                  <div className='font-semibold'>Actions</div>
                  <div className='flex gap-2'>
                    <ViewButton url={url?.shortCode}/>
                    <CopyButton textToCopy={url?.shortCode} />
                    <EditButton shortCode={url?.shortCode} onUpdate={fetchUrls} />
                    <DeleteButton onClick={() => handleDelete(url?.shortCode)} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AllLinks;
