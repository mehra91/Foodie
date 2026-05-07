import React, { useContext } from 'react'
import { useState } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { TiShoppingCart } from "react-icons/ti";
import { Link, useNavigate } from 'react-router';
import { StoreContext } from '../Context/StoreContext';

const Navbar = ({ setIsSignIn }) => {

  const { getTotalAmount, token, setToken } = useContext(StoreContext);
  const [open, setOpen] = useState(false);
  const navigate =  useNavigate();

  const logOut = ()=>{
        localStorage.removeItem("token");
        setToken("")
          setOpen(false);
        navigate('/');
  }

  return (
    <div className='    flex  items-center justify-around p-2 h-28 w-full '  >
      <div className=' bg-white flex items-center justify-center h-26 w-1/5 rounded-2xl py-2 overflow-hidden '>
        <Link to='/'>   <img src={assets.logo} alt="LOGO" className='h-auto w-auto cursor-pointer bg-inherit rounded-2xl  bg-cover' />
        </Link>
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
          <Link to='/cart'> < TiShoppingCart size={35} color='orange' className='cursor-pointer  hover:size-10 hover:rounded' /> </Link>
          {
            (getTotalAmount() > 0)
              ?
              <div className='bg-red-500 h-2 w-2 rounded-full absolute top-1 right-3 animate-bounce '></div>
              : <></>
          }
        </li>

        {!token ? <button
          onClick={() =>
            setIsSignIn(true)
          }
          className='text-2xl text-yellow-900 font-semibold capitalize cursor-pointer ' >
          signIn
        </button>
          :
          <div
            className="relative w-10 h-10 border flex items-center justify-center rounded-full"
            onClick={() => setOpen(!open)}
          >

            {/* Profile Image */}
            <img
              src={assets.profile_icon}
              className="w-8 h-8 rounded-full cursor-pointer object-contain"
            />

            {/* Dropdown */}
            <div className={`
                  absolute right-0 top-10 w-30 bg-gray-400 shadow-lg rounded-xl p-3
                  transition-all duration-200
                  ${open ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}
              `}
              >

              <button className="flex items-center justify-center w-full text-base font-semibold opacity-80 hover:opacity-100 h-8 cursor-pointer">
                Orders
              </button>

              <button  onClick={logOut}
               className="flex items-center justify-center w-full text-base font-semibold opacity-80 hover:opacity-100 h-8 cursor-pointer">
                Logout
              </button>

            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar