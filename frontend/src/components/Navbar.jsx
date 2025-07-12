import React from 'react'
import CreateButton from './CreateButton'

const Navbar = () => {
  return (
    <div className='bg-white px-10 py-5 flex justify-between items-center shadow-md'>
      <h1 className='md:text-3xl text-xl font-bold font-sans'>Abubakar's Project</h1>
      <CreateButton/>
    </div>
  )
}

export default Navbar