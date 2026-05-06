import React from 'react'
import Navbar from './Components/Navbar'
import SideBar from './Components/Sidebar'
import { Routes,Route } from 'react-router-dom'
import Add from './Pages/Add'
import List from './Pages/List'
import Order from './Pages/Order'

const App = () => {
  return (
    <div>
        <Navbar/>
        <hr className='h-1 bg-gray-700 w-full ' />
        <div className='  min-h-98 w-full gap-x-5 rounded-b-2xl flex justify-start '>
         <div className='bg-gray-500 min-h-98 w-1/7  flex flex-col justify-start' >
           <SideBar/>
          
         </div>
         <div className='bg-red-300 min-h-98 h-auto w-6/7  '>
          <Routes>
            <Route path='/add' element={<Add/>}/>
             <Route path='/list' element={<List/>}/>
              <Route path='/orders' element={<Order/>}/>
          </Routes>
         </div>
        </div>
       
    </div>
  )
}

export default App; 