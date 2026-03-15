import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <div className='    bg-neutral-800 h-auto w-full flex flex-col items-center justify-around text-white '>
      <div className='flex items-start justify-between h-auto w-5xl  '>
        <div className='  h-full w-1/3 flex flex-col items-start justify-between '>
          <img src={assets.logo} className='h-30 w-45  ' />
          <p className='    h-auto flex  w-2xs text-base/3 leading-7'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit consequatur at commodi incidunt culpa ipsam
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit consequatur at commodi incidunt culpa ipsam
          </p>
          <p className='flex items-center justify-start  gap-5  w-3xs h-10'>
            <span className='cursor-pointer h-8 flex items-center justify-center w-8 text-lg'><FaFacebookF /></span>
            <span className='cursor-pointer h-8 flex items-center justify-center w-8 text-lg'><FaXTwitter /></span>
            <span className='cursor-pointer h-8 flex items-center justify-center w-8 text-lg'><FiInstagram /></span>
          </p>
        </div>
        <div className=' h-60 gap-y-2 w-auto flex flex-col items-start justify-end capitalize '>
          <h4 className='text-lg flex items-start justify-center font-semibold opacity-85  '>
            company
          </h4>
          <li className='list-none cursor-pointer  text-base/6 opacity-80'>Home</li>
          <li className='list-none cursor-pointer  text-base/6 opacity-80'>about us</li>
          <li className='list-none cursor-pointer  text-base/6 opacity-80'>Delivary</li>
          <li className='list-none cursor-pointer  text-base/6 opacity-80'>privacy policy</li>

        </div>
        <div className='  h-45 gap-y-2 capitalize w-auto flex flex-col items-start justify-end '>
          <h4 className='text-lg flex items-start justify-start font-semibold opacity-85  '>
            get in Touch  
          </h4>
          <li className='list-none    text-base/6 opacity-60 '>
            +91905804137
          </li>
          <li className='list-none   text-base/6 opacity-60 '>
            pm7300779625@gmail.com
          </li>
        </div>
      </div>
      <div className='w-5xl  h-8 flex flex-col text-white    justify-center'>
        <hr />
        <p className='text-md tracking-wide capitalize opacity-60 font-mono self-center'>
          Copyright 2024 @Food.com - All Right Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer