import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Header = () => {
  return (
    <div className='flex items-center justify-center h-fit w-full'>
      <div className='w-full sm:w-5xl h-64 sm:h-80 md:h-100 gap-y-5 flex flex-col items-baseline justify-end bg-center bg-cover rounded-2xl px-4 sm:px-6 lg:px-8'
        style={{ backgroundImage: `url(${assets.header_img})` }} >

        <div className='h-auto sm:h-96 w-full sm:w-2xl flex flex-col items-center justify-end animate-fadeIn'>

          <div className='h-auto sm:h-3/4 w-full sm:w-2xl flex flex-col items-center justify-end gap-y-5'>
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold flex items-center h-auto w-full sm:w-md tracking-wider">
              Order your <br /> favourite food here
            </h2>
            <p className='h-auto w-full sm:w-md italic text-white flex items-center justify-center tracking-wide text-sm sm:text-base'>
              choose from a diverse menu featuring a delecatable array of dishes crafted with the finest ingredients and culturly expertise . Our mission   is to satisfy your cravings and elevateyour dining experience,one delicious meal at a time .
            </p>
          </div>
        </div>
        <div className='h-auto sm:h-1/4 w-full sm:w-52 flex items-start justify-end animate-fadeIn pb-4 sm:pb-0'>
          <button className='bg-white flex items-center justify-center capitalize h-9 w-24 sm:w-25 p-1 font-semibold border-white rounded-2xl cursor-pointer hover:scale-105 text-xs sm:text-sm text-gray-800'>
            view Menu
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header;