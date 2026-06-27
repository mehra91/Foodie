import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <div className='bg-neutral-800 h-auto w-full flex flex-col items-center justify-around text-white px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col sm:flex-row items-start justify-between h-auto w-full gap-8 sm:gap-6'>
        <div className='h-full w-full sm:w-1/3 flex flex-col items-start justify-between gap-4'>
          <img src={assets.logo} className='h-24 w-32 sm:h-30 sm:w-45' />
          <p className='h-auto w-full sm:w-2xs text-sm sm:text-base leading-7'>
          FoodUI is your go-to food ordering platform designed to deliver delicious meals quickly and smoothly. We focus on providing a fast, secure, and user-friendly experience for customers and restaurants alike.
          </p>
          <p className='flex items-center justify-start gap-5 w-auto h-10'>
            <span className='cursor-pointer h-8 flex items-center justify-center w-8 text-lg'><FaFacebookF /></span>
            <span className='cursor-pointer h-8 flex items-center justify-center w-8 text-lg'><FaXTwitter /></span>
            <span className='cursor-pointer h-8 flex items-center justify-center w-8 text-lg'><FiInstagram /></span>
          </p>
        </div>
        <div className='h-auto gap-y-2 w-full sm:w-auto flex flex-col items-start justify-end capitalize'>
          <h4 className='text-base sm:text-lg flex items-start justify-center font-semibold opacity-85'>
            company
          </h4>
          <li className='list-none cursor-pointer text-sm sm:text-base opacity-80'>Home</li>
          <li className='list-none cursor-pointer text-sm sm:text-base opacity-80'>about us</li>
          <li className='list-none cursor-pointer text-sm sm:text-base opacity-80'>Delivary</li>
          <li className='list-none cursor-pointer text-sm sm:text-base opacity-80'>privacy policy</li>
        </div>
        <div className='h-auto gap-y-2 capitalize w-full sm:w-auto flex flex-col items-start justify-end'>
          <h4 className='text-base sm:text-lg flex items-start justify-start font-semibold opacity-85'>
            get in Touch  
          </h4>
          <li className='list-none text-sm sm:text-base opacity-60'>
            +91905804137
          </li>
          <li className='list-none text-sm sm:text-base opacity-60'>
            pm7300779625@gmail.com
          </li>
        </div>
      </div>
      <div className='w-full h-8 flex flex-col text-white justify-center'>
        <hr />
        <p className='text-xs sm:text-sm tracking-wide capitalize opacity-60 font-mono self-center'>
          Copyright 2026  - All Right Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer