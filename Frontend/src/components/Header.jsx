import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Header = () => {
  return (
    <div className='flex items-center justify-center h-fit w-full   '>
      <div className='w-5xl h-100 gap-y-5 flex flex-col items-baseline  justify-end-safe  bg-center bg-cover  rounded-2xl'
        style={{ backgroundImage: `url(${assets.header_img})` }} >

        <div className='h-96 w-2xl flex flex-col items-center  justify-end animate-fadeIn '>

          <div className='h-3/4 w-2xl flex  flex-col items-center justify-end gap-y-5 '>
            <h2 className="text-white text-4xl font-bold   flex items-center  h-auto    w-md tracking-wider">
              Order your <br/> favourite food here
            </h2>
            <p className='h-auto w-md italic text-white flex items-center justify-center tracking-wide'>
              choose from a diverse menu featuring a delecatable array of dishes crafted with the finest ingredients and culturly expertise . Our mission   is to satisfy your cravings and elevateyour dining experience,one delicious meal at a time .
            </p>
          </div>
        </div>
        <div className='h-1/4 w-52  flex items-start  justify-end-safe animate-fadeIn   '>
          <button className='bg-white flex items-center justify-center capitalize h-9 w-25 p-1 font-semibold border-white rounded-2xl cursor-pointer   hover:scale-105 text-sm text-gray-800'>
            view Menu
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header;