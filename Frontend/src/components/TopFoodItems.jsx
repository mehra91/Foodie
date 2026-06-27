import React, { use, useContext, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { AiOutlineMinus } from "react-icons/ai";

import { assets } from '../assets/frontend_assets/assets'
import { StoreContext } from '../Context/StoreContext';

const TopFoodItems = ({ id, name, img, price, description, category }) => {
  const { cartItems,addToCart , removeFromCart,url}  = useContext(StoreContext);
  return (
    <div key={id} className='rounded-lg flex flex-col items-center justify-center h-80 sm:h-90 w-64 sm:w-2xs shadow-2xl gap-y-2 px-3 py-3'>
      <img src={img} className='h-48 sm:h-auto w-full sm:w-3xs rounded object-fill flex items-center justify-center overflow-hidden' />
      <div className='flex items-center justify-between w-full sm:w-3xs gap-2'>
        <h2 className='text-base sm:text-lg font-bold italic w-full sm:w-3xs'>
          {name}
        </h2>
        <img src={assets.rating_starts} className='h-4 sm:h-auto w-16 sm:w-auto' />
      </div>
      <p className='text-xs sm:text-sm opacity-60 font-semibold w-full sm:w-3xs'>
        {description}
      </p>
      <div className='flex items-center justify-between w-full sm:w-3xs gap-2'>
        <h2 className='text-lg sm:text-xl text-red-500 w-auto'>
          ₹{price}.00
        </h2>
        {
          !cartItems[id]
            ? <span onClick={() => addToCart(id)}
              className='text-xs sm:text-md text-green-900 uppercase font-bold cursor-pointer flex items-center justify-end'>
              Add
            </span>
            : <span className='flex items-center justify-around border rounded-2xl font-bold text-green-900 w-24 sm:w-30'>
              <span onClick={()=>
                removeFromCart(id)
              }
              className='text-base sm:text-lg text-red-800 rounded-full cursor-pointer'
              >
                <AiOutlineMinus />
              </span>
              <span className='text-black font-semibold text-base sm:text-lg'>
                {cartItems[id]}
              </span>
              <span onClick={()=>
                addToCart(id)
              }
              className='text-base sm:text-lg rounded-full cursor-pointer'
              >
               <IoMdAdd />
              </span>
            </span>
        }
      </div>
    </div>
  )
}

export default TopFoodItems;