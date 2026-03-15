import React from 'react'
import { assets, menu_list } from '../assets/frontend_assets/assets'

const MenuList = ({ category, setCategory }) => {

  return (



    <div className='flex flex-col items-start justify-center gap-y-6  h-auto w-5xl  '>

      <h2 className='text-3xl tracking-wide capitalize font-semibold '>

        Explore our Menu
      </h2>
      <p className='text-lg tracking-tight   italic w-2xl opacity-70 font-medium'>
        Choose from a diverse menu featuring a detectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>
      <div className='flex items-center justify-start  flex-wrap gap-x-2 gap-y-5'>


        {
          menu_list.map((items, idx) => {
            return (
              <div key={idx}
                onClick={() => {
                  setCategory(items.menu_name)
                }}
                className='  h-40 w-30   flex items-center justify-center flex-col gap-y-2 '>
                <img src={items.menu_image} className={`cursor-pointer justify-self rounded-full transition-transform duration-200  ${category === items.menu_name ? " border-4 border-yellow-900 scale-105" : "border-none"
                  }`} />
                <h3 className={`font-semibold text-lg cursor-pointer ${category === items.menu_name ? "  opacity-100" : "opacity-60"
                  }`}>

                  {items.menu_name}
                </h3>
              </div>
            )
          })
        }
      </div>
      <hr className="w-full my-6 border-t-4 rounded-2xl border-gray-300" />


    </div>


  )
}

export default MenuList