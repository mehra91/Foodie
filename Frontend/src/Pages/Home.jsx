import React, { useState } from 'react'
import Header from '../components/Header'
import MenuList from '../components/MenuList'
import DisplayItems from '../components/DisplayItems';

const Home = ({menuRef}) => {
    const [category, setCategory] = useState('All');
       
  return (
    <div className='flex items-center justify-center flex-col gap-y-3 sm:gap-y-4 w-full px-4 sm:px-6 lg:px-8'>
      <Header/>
      <MenuList category={category} setCategory={setCategory} />
      <div ref={menuRef}>
        <DisplayItems category={category} />
      </div>
    </div>
  )
}

export default Home