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
            'bg-amber-500 border-b-2 sm:border-r-2 sm:border-b-0'
            :
            ''}
          min-h-10 sm:min-h-12 h-auto border-b sm:border-r flex items-center justify-evenly sm:justify-start gap-2 sm:gap-0 px-2 sm:px-0`} >
        <p className='text-sm sm:text-lg font-semibold tracking-tight leading-snug capitalize h-auto w-auto sm:w-30 flex items-center justify-center'>
          Add items
        </p>
        <p className='h-8 sm:h-10 w-8 sm:w-10 flex items-center justify-center'>
          <IoMdAddCircleOutline size={20} className='sm:size-5.5 cursor-pointer' />
        </p>
      </NavLink>
      <NavLink to='/list'
        className={({ isActive }) =>
          `${isActive
            ?
            'bg-amber-500 border-b-2 sm:border-r-2 sm:border-b-0'
            :
            ''} 
            min-h-10 sm:min-h-12 h-auto border-b sm:border-r flex items-center justify-evenly sm:justify-start gap-2 sm:gap-0 px-2 sm:px-0`}>
        <p className='text-sm sm:text-lg font-semibold tracking-tight leading-snug capitalize h-auto w-auto sm:w-30 flex items-center justify-center'>
          list items
        </p>
        <p className='h-8 sm:h-10 w-8 sm:w-10 flex items-center justify-center'>
          <FaList size={18} className='sm:size-5 cursor-pointer' />
        </p>
      </NavLink>
     <NavLink to='/orders'
        className={({ isActive }) =>
          `${isActive
            ?
            'bg-amber-500 border-b-2 sm:border-r-2 sm:border-b-0'
            :
            ''} 
            min-h-10 sm:min-h-12 h-auto border-b sm:border-r flex items-center justify-evenly sm:justify-start gap-2 sm:gap-0 px-2 sm:px-0`}>
        <p className='text-sm sm:text-lg font-semibold tracking-tight leading-snug capitalize h-auto w-auto sm:w-30 flex items-center justify-center'>
          orders
        </p>
        <p className='h-8 sm:h-10 w-8 sm:w-10 flex items-center justify-center'>
          <PiPackage size={22} className='sm:size-6.5 cursor-pointer' />
        </p>
      </NavLink>

    </>
  )
}

export default Sidebar;