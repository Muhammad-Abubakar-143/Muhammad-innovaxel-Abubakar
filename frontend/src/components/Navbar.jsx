import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-white px-10 py-5 flex justify-between items-center shadow-md'>
      <h1 className='md:text-3xl text-xl font-bold font-sans'>Abubakar's Project</h1>
      <button className='bg-indigo-500 px-3 py-1 rounded-full text-white hover:bg-indigo-700 duration-300 ease-in-out font-normal font-sans'>Create New</button>
    </div>
  )
}

export default Navbar