import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-gradient-to-r from-neutral-50 to-slate-500 text-black py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>Todo-List</span>
        </div>
    </nav>
  )
}

export default Navbar
