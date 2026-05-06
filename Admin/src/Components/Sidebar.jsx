import React from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { PiPackage } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
 
const Sidebar = () => {
  return (

    <>
      <NavLink to='/add'
        className={({ isActive }) =>
          `${isActive
            ?
            'bg-amber-500 border-b-2'
            :
            ''}
          min-h-12 h-auto  border-b flex  items-center justify-evenly`} >
        <p className=' text-lg font-semibold tracking-tight leading-snug capitalize  h-auto w-30 flex items-center justify-center'>
          Add items
        </p>
        <p className=' h-10 w-10 flex items-center justify-center'>
          <IoMdAddCircleOutline size={22} className='cursor-pointer ' />
        </p>
      </NavLink>
      <NavLink to='/list'
        className={({ isActive }) =>
          `${isActive
            ?
            'bg-amber-500 border-b-2'
            :
            ''} 
            min-h-12 h-auto border-b flex  items-center justify-evenly`}>
        <p className=' text-lg font-semibold tracking-tight leading-snug capitalize  h-auto w-30 flex items-center justify-center'>
          list items
        </p>
        <p className=' h-10 w-10 flex items-center justify-center'>
          <FaList size={20} className='cursor-pointer' />
        </p>
      </NavLink>
     <NavLink to='/orders'
        className={({ isActive }) =>
          `${isActive
            ?
            'bg-amber-500 border-b-2'
            :
            ''} 
            min-h-12 h-auto border-b flex  items-center justify-evenly`}>
        <p className=' text-lg font-semibold tracking-tight leading-snug capitalize  h-auto w-30 flex items-center justify-center'>
          orders
        </p>
        <p className=' h-10 w-10 flex items-center justify-center' >
          <PiPackage size={26} className='cursor-pointer' />
        </p>
      </NavLink>

    </>
  )
}

export default Sidebar;