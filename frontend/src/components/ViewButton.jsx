import React from 'react'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { Link } from 'react-router-dom'

const ViewButton = ({url}) => {
  return (
    <Link to={`${url}/stats`}>
    <MdOutlineRemoveRedEye className='p-2 bg-gray-200 rounded-lg cursor-pointer' size={35}/>
    </Link>

  )
}

export default ViewButton