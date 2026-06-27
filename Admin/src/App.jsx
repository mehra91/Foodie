import React from 'react'
import Navbar from './Components/Navbar'
import SideBar from './Components/Sidebar'
import { Routes,Route } from 'react-router-dom'
import Add from './Pages/Add'
import List from './Pages/List'
import Order from './Pages/Order'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const url = import.meta.env.VITE_API_URL;
  return (

    <div className='w-full'>
      <ToastContainer/>
        <Navbar/>
        <hr className='h-1 bg-gray-700 w-full' />
        <div className='min-h-98 w-full gap-x-3 sm:gap-x-5 rounded-b-2xl flex flex-col sm:flex-row justify-start'>
         <div className='bg-gray-500 min-h-auto sm:min-h-98 w-full sm:w-1/7 flex flex-row sm:flex-col justify-start overflow-x-auto sm:overflow-x-visible'>
           <SideBar/>
         </div>
         <div className='min-h-98 h-auto w-full sm:w-6/7 px-3 sm:px-0'>
          <Routes>
            <Route path='/add' element={<Add url={url}/>}/>
             <Route path='/list' element={<List url={url}/>}/>
              <Route path='/orders' element={<Order url={url}/>}/>
          </Routes>
         </div>
        </div>
    </div>
  )
}

export default App;