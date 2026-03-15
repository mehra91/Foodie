import React from 'react'
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";

import Cart from './Pages/Cart'
import PlaceOrder from './Pages/PlaceOrder'
import Footer from './components/Footer';


const App = () => {
  return (
    <div className='flex flex-col   gap-y-8'>
      <div className='flex flex-col gap-y-5 '>

        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeOrder' element={<PlaceOrder />} />
        </Routes>
      </div>
      <div >
        <Footer/>
      </div>

    </div>
  )
}

export default App


