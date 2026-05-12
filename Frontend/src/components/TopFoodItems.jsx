import React, { use, useContext, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { AiOutlineMinus } from "react-icons/ai";


import { assets } from '../assets/frontend_assets/assets'
import { StoreContext } from '../Context/StoreContext';

const TopFoodItems = ({ id, name, img, price, description, category }) => {
 
  const { cartItems,addToCart , removeFromCart,url}  = useContext(StoreContext);
  return (
    <div key={id} className='  rounded-lg  flex flex-col items-center justify-center h-90 w-2xs shadow-2xl   gap-y-2'>
      <img src={img} className='h-auto w-3xs rounded object-fill  flex items-center justify-center overflow-hidden  ' />
      <div className='flex items-center justify-between w-3xs '>
        <h2 className='text-lg font-bold italic   w-3xs '>
          {name}
        </h2>
        <img src={assets.rating_starts} />
      </div>
      <p className='text-sm   opacity-60 font-semibold   w-3xs'>
        {description}
      </p>
      <div className='flex items-center justify-between w-3xs'>
        <h2 className='text-xl   text-red-500   w-3xs'>
           ₹{price}.00
        </h2>
        {
          !cartItems[id]
            ? <span onClick={() => addToCart(id)     
            }
              className='text-md text-green-900 uppercase font-bold cursor-pointer   flex itmes-center justify-end'>
              Add
            </span>
            : <span className='flex items-center justify-around  border rounded-2xl font-bold text-green-900 w-30  '>
              <span onClick={()=>
                removeFromCart(id)
              }
              className='text-lg text-red-800 rounded-full cursor-pointer   '
              >
                <AiOutlineMinus />
              </span>
              <span className='text-black font-semibold text-lg'>
                {cartItems[id]}
              </span>
              <span onClick={()=>
                addToCart(id)
              }
              className='text-lg rounded-full  cursor-pointer   '
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