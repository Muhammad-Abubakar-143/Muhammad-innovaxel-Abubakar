import React from 'react'
import {MdOutlineDeleteOutline} from "react-icons/md"

const DeleteButton = ({onClick}) => {
  return (
    <MdOutlineDeleteOutline className='p-2 bg-gray-200 rounded-lg cursor-pointer' size={35}  onClick={onClick}/>
  )
}

export default DeleteButton