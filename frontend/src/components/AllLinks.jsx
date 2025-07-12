import React from 'react';
import CreateButton from './CreateButton';
import CopyButton from './CopyButton';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

const AllLinks = () => {
  const urls = [{
    id:1,
    url:"https://www.youtube.com/Mx23cE3bjyx",
    shortCode: "abc123",
    shortUrl: "http://localhost::5173/abc123",
    createdAt: "2021-09-01T12:00:00Z",
    updatedAt: "2021-09-01T12:00:00Z",
    "accessCount": 10,
  }]

  return (
    <div className='bg-white max-w-5xl mx-auto mt-36 shadow-md p-4 rounded-lg'>
      {urls.length === 0 ? 
      <div className='h-52 flex justify-center items-center flex-col'>
        <p className='text-gray-700 text-2xl mb-5 text-center'>No URL found.</p>
        <CreateButton/>
      </div>
    : 
    <div>
      <h1 className='md:text-4xl text-2xl text-center mb-8 font-bold font-sans'>URL Shortening</h1>
      <ul className='space-y-2'>
          {urls.map((url, index) => (
            <li key={index} className='border flex justify-between items-center border-gray-300 p-3 rounded hover:bg-gray-50'>
              <div>
              <div className='font-semibold'>{url?.shortUrl}</div>
              <div className='text-sm text-gray-600'>{url.url}</div>
              </div>
              <div>
              <div className='font-semibold'>Created At</div>
              <div className='text-sm text-gray-600'>{url?.createdAt}</div>
              </div>
              <div>
              <div className='font-semibold'>Updated At</div>
              <div className='text-sm text-gray-600'>{url?.updatedAt}</div>
              </div>
              <div>
              <div className='font-semibold'>Actions</div>
              <div className='flex gap-2'>
                <CopyButton textToCopy={url.shortUrl}/>
                <EditButton/>
                <DeleteButton/>
              </div>
              </div>
            </li>
          ))}
        </ul>

      </div>
    }
      {/* {loading ? (
        <p className='text-gray-500 text-center'>Loading...</p>
      ) : error ? (
        <p className='text-red-500 text-center'>{error}</p>
      ) : urls.length === 0 ? (
        <p className='text-gray-700 text-center'>No URL found. Create one</p>
      ) : (
        <ul className='space-y-2'>
          {urls.map((url, index) => (
            <li key={index} className='border border-gray-300 p-3 rounded hover:bg-gray-50'>
              <div className='font-semibold'>{url?.shortUrl}</div>
              <div className='text-sm text-gray-600'>{url.originalUrl}</div>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default AllLinks;
