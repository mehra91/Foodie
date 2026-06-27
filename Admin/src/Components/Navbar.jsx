import React from 'react'
import {assets} from '../assets/admin_assets/assets'

const Navbar = () => {
  return (
    <div className='bg-white h-20 sm:h-28 w-full flex items-center justify-between'>
      <img src={assets.logo} alt="" className='h-full w-24 sm:w-40 ml-2 sm:ml-4 flex items-center justify-center' />
      <img src={assets.profile_image} alt="" className='h-10 sm:h-12 w-10 sm:w-12 mr-4 sm:mr-8 rounded-full' />
    </div>
  )
}

export default Navbar