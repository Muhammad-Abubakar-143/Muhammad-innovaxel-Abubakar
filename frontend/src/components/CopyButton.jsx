import React from 'react'
import {MdOutlineContentCopy} from "react-icons/md"

const CopyButton = () => {
  return (
    <MdOutlineContentCopy className='p-2 bg-gray-200 rounded-lg cursor-pointer' size={35} />
  )
}

export default CopyButton