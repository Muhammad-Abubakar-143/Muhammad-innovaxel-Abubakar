import React, { useState } from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';

const CopyButton = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative">
      <MdOutlineContentCopy
        className='p-2 bg-gray-200 rounded-lg cursor-pointer'
        size={35}
        onClick={handleCopy}
      />
      {copied && (
        <span className='absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-green-600 bg-black px-2 py-1 rounded-lg'>
          Copied!
        </span>
      )}
    </div>
  );
};

export default CopyButton;
