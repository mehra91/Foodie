import React from 'react'
import {assets} from '../assets/admin_assets/assets'

const Navbar = () => {
  return (
    <div className='bg-white h-28 w-full flex items-center justify-between  object-cover'>
      <img src={assets.logo} alt="" className='h-full w-40  ml-4 flex items-center justify-center' />
      <img src={assets.profile_image} alt="" className=' h-12 w-12 mr-8 rounded-full' />
    </div>
  )
}

export default Navbar