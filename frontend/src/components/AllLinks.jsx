import React, { useEffect, useState } from 'react';
import CreateButton from './CreateButton';
import CopyButton from './CopyButton';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import { getAllShortUrls } from '../api/api';


const AllLinks = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUrls() {
      try {
        const data = await getAllShortUrls();
        console.log('data', data)
        setUrls(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUrls();
  }, []);

  return (
    <div className='bg-white max-w-5xl mx-auto mt-36 shadow-md p-4 rounded-lg'>
      {loading ? (
        <p className='text-center text-gray-500'>Loading...</p>
      ) : error ? (
        <p className='text-center text-red-600'>{error}</p>
      ) : urls.length === 0 ? (
        <div className='h-52 flex justify-center items-center flex-col'>
          <p className='text-gray-700 text-2xl mb-5 text-center'>No URL found.</p>
          <CreateButton />
        </div>
      ) : (
        <div>
          <h1 className='md:text-4xl text-2xl text-center mb-8 font-bold font-sans'>URL Shortening</h1>
          <ul className='space-y-2'>
            {urls.map((url, index) => (
              <li key={index} className='border flex justify-between items-center border-gray-300 p-3 rounded hover:bg-gray-50'>
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
                    <CopyButton textToCopy={url?.shortCode} />
                    <EditButton />
                    <DeleteButton />
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
