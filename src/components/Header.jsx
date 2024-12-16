import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {


  return (
    <div className='flex bg-purple-950 px-6 pb-6 pt-4 items-center justify-between'>
        <h1 className='text-3xl text-purple-300 font-semibold'>BookTurf</h1>
        <div className='text-xl gap-10 text-purple-300 flex'>
            <button className='hover:bg-black h-9 w-24 rounded'><NavLink to='/' className={({ isActive }) =>
            isActive
              ? 'bg-black text-purple-300 h-full w-full rounded flex justify-center items-center'
              : 'hover:bg-black text-purple-300 h-full w-full rounded flex justify-center items-center'}>Home</NavLink></button>
            <button className='hover:bg-black h-9 w-24 rounded'><NavLink to='/about' className={({ isActive }) =>
            isActive
              ? 'bg-black text-purple-300 h-full w-full rounded flex justify-center items-center'
              : 'hover:bg-black text-purple-300 h-full w-full rounded flex justify-center items-center'}>About</NavLink></button>
            <button className='hover:bg-black h-9 w-24 rounded'><NavLink to= '/contact' className={({ isActive }) =>
            isActive
              ? 'bg-black text-purple-300 h-full w-full rounded flex justify-center items-center'
              : 'hover:bg-black text-purple-300 h-full w-full rounded flex justify-center items-center'}>Contact</NavLink></button>
            <button className='hover:bg-black h-9 w-24 rounded'><NavLink to='/login' className={({ isActive }) =>
            isActive
              ? 'bg-black text-purple-300 h-full w-full rounded flex justify-center items-center'
              : 'hover:bg-black text-purple-300 h-full w-full rounded flex justify-center items-center'}>Login</NavLink></button>
            <button className='hover:bg-black h-9 w-24 rounded'><NavLink to='/sigin' className={({ isActive }) =>
            isActive
              ? 'bg-black text-purple-300 h-full w-full rounded flex justify-center items-center'
              : 'hover:bg-black text-purple-300 h-full w-full rounded flex justify-center items-center'}>SignIn</NavLink></button>
        </div>
    </div>
  )
}

export default Header