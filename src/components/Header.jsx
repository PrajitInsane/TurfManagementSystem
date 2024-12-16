import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {


  return (
    <div className='flex bg-purple-950 px-6 pb-6 pt-4 items-center justify-between'>
        <h1 className='text-2xl text-purple-300 '>BookTurf</h1>
        <div className='text-xl gap-10 text-purple-300 flex'>
            <button className='hover:bg-black h-9 w-24 rounded'><Link to='/'>Home</Link></button>
            <button className='hover:bg-black h-9 w-24 rounded'><Link to='/about'>About</Link></button>
            <button className='hover:bg-black h-9 w-24 rounded'><Link to= '/contact'>Contact</Link></button>
            <button className='hover:bg-black h-9 w-24 rounded'><Link to='/login'>Login</Link></button>
            <button className='hover:bg-black h-9 w-24 rounded'><Link to='/sigin'>SignIn</Link></button>
        </div>
    </div>
  )
}

export default Header