import React from 'react'
import { assets } from '../assets/frontend_assets/assets';
import { TiShoppingCart } from "react-icons/ti";
 
const Navbar = ({setIsSignIn}) => {
 
  return (
    <div className='    flex  items-center justify-around p-2 h-28 w-full '  >
      <div className=' bg-white flex items-center justify-center h-26 w-1/5 rounded-2xl py-2 overflow-hidden '>
        <img src={assets.logo} alt="LOGO" className='h-auto w-auto cursor-pointer bg-inherit rounded-2xl  bg-cover' />
      </div>
      <div className='    flex items-center justify-evenly h-20 w-2/5 list-none rounded-2xl ease-in-out transition-all'>
        <li className=' flex items-center justify-center text-xl hover:    ease-in-out transition-all cursor-pointer font-semibold  capitalize text-yellow-900  '>
          Menu
        </li>
        <li className=' flex items-center justify-center text-xl hover:te    ease-in-out transition-all  cursor-pointer font-semibold  capitalize text-yellow-900  '>
          mobile app
        </li>
        <li className=' flex items-center justify-center text-xl hover:te    ease-in-out transition-all  cursor-pointer font-semibold  capitalize text-yellow-900  '>
          contact us
        </li>
      </div>
      <div className='  w-1/5 h-20 flex items-center justify-evenly list-none '>

        <li className='bg- white h-10 w-15 flex items-center justify-center relative' >
          < TiShoppingCart size={35} color='orange' className='cursor-pointer  hover:size-10 hover:rounded' />
          <div className='bg-red-500 h-2 w-2 rounded-full absolute top-1 right-3'></div>
        </li>
        
        <button onClick={()=>
         setIsSignIn(true)
        }
         className='text-2xl text-yellow-900 font-semibold capitalize cursor-pointer ' >
          signIn
        </button>
      </div>
    </div>
  )
}

export default Navbar