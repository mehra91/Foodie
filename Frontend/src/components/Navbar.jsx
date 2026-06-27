import React, { useContext } from 'react'
import { useState } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { TiShoppingCart } from "react-icons/ti";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from 'react-router';
import { StoreContext } from '../Context/StoreContext';

const Navbar = ({ setIsSignIn ,menuRef }) => {

  const { getTotalAmount, token, logout } = useContext(StoreContext);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    setOpen(false);
    navigate('/');
  }

  const scrollToMenu = () => {
    if (!menuRef || !menuRef.current) return;
    menuRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setMobileMenuOpen(false);
  };

  return (
    <div className='flex flex-col w-full'>
      <div className='flex items-center justify-between sm:justify-around p-2 h-auto sm:h-28 w-full gap-4 sm:gap-0'>
        <div className='bg-white flex items-center justify-center h-16 sm:h-26 w-1/3 sm:w-1/5 rounded-2xl py-2 overflow-hidden'>
          <Link to='/'><img src={assets.logo} alt="LOGO" className='h-auto w-auto cursor-pointer bg-inherit rounded-2xl bg-cover' />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className='hidden sm:flex items-center justify-evenly h-20 w-2/5 list-none rounded-2xl gap-0'>
          <Link to='/' onClick={scrollToMenu}><li onClick={scrollToMenu} className='flex items-center justify-center text-xl hover:ease-in-out transition-all cursor-pointer font-semibold capitalize text-yellow-900'>
            Menu
          </li></Link>
          <li className='flex items-center justify-center text-xl hover:ease-in-out transition-all font-semibold capitalize text-yellow-900 cursor-text'>
            mobile app
          </li>
          <Link to="/contact">
            <li className='flex items-center justify-center text-xl hover:ease-in-out transition-all cursor-pointer font-semibold capitalize text-yellow-900'>
              contact us
            </li>
          </Link>
        </div>

        {/* Desktop Right Section */}
        <div className='hidden sm:flex w-1/5 h-20 items-center justify-evenly list-none gap-0'>
          <li className='bg-white h-10 w-15 flex items-center justify-center relative'>
            <Link to='/cart'><TiShoppingCart size={35} color='orange' className='cursor-pointer hover:size-10 hover:rounded' /></Link>
            {
              (getTotalAmount() > 0)
                ?
                <div className='bg-red-500 h-2 w-2 rounded-full absolute top-1 right-3 animate-bounce'></div>
                : <></>
            }
          </li>

          {!token ? <button
            onClick={() =>
              setIsSignIn(true)
            }
            className='text-2xl text-yellow-900 font-semibold capitalize cursor-pointer'>
            signIn
          </button>
            :
            <div
              className="relative w-10 h-10 border flex items-center justify-center rounded-full"
              onClick={() => setOpen(!open)}
            >
              <img
                src={assets.profile_icon}
                className="w-8 h-8 rounded-full cursor-pointer object-contain"
              />

              <div className={`
                    absolute right-0 top-10 w-30 bg-gray-400 shadow-lg rounded-xl p-3
                    transition-all duration-200
                    ${open ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}
                `}
              >
                <Link to="/myorders">
                  <button className="flex items-center justify-center w-full text-base font-semibold opacity-80 hover:opacity-100 h-8 cursor-pointer">
                    Orders
                  </button>
                </Link>

                <button onClick={handleLogOut}
                  className="flex items-center justify-center w-full text-base font-semibold opacity-80 hover:opacity-100 h-8 cursor-pointer">
                  Logout
                </button>

              </div>
            </div>
          }
        </div>

        {/* Mobile Right Section */}
        <div className='sm:hidden flex items-center justify-end gap-3'>
          <li className='bg-white h-10 w-12 flex items-center justify-center relative list-none'>
            <Link to='/cart'><TiShoppingCart size={28} color='orange' className='cursor-pointer' /></Link>
            {
              (getTotalAmount() > 0)
                ?
                <div className='bg-red-500 h-2 w-2 rounded-full absolute top-0 right-2 animate-bounce'></div>
                : <></>
            }
          </li>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className='text-2xl text-yellow-900'>
            {mobileMenuOpen ? <RxCross2 /> : <RxHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='sm:hidden bg-white border-t border-gray-200 flex flex-col gap-0 w-full'>
          <Link to='/' onClick={scrollToMenu}>
            <div onClick={scrollToMenu} className='flex items-center justify-center text-base font-semibold capitalize text-yellow-900 py-4 border-b'>
              Menu
            </div>
          </Link>
          <div className='flex items-center justify-center text-base font-semibold capitalize text-yellow-900 py-4 border-b cursor-text'>
            mobile app
          </div>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
            <div className='flex items-center justify-center text-base font-semibold capitalize text-yellow-900 py-4 border-b w-full'>
              contact us
            </div>
          </Link>

          {!token ? (
            <button onClick={() => { setIsSignIn(true); setMobileMenuOpen(false); }} className='text-base text-yellow-900 font-semibold capitalize py-4 border-b'>
              signIn
            </button>
          ) : (
            <>
              <Link to="/myorders" onClick={() => setMobileMenuOpen(false)}>
                <button className="flex items-center justify-center w-full text-base font-semibold text-yellow-900 py-4 border-b">
                  Orders
                </button>
              </Link>
              <button onClick={() => { handleLogOut(); setMobileMenuOpen(false); }} className="flex items-center justify-center w-full text-base font-semibold text-yellow-900 py-4">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Navbar