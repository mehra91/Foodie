import React from 'react'
import { useState,useRef } from 'react';
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Verify from './Pages/Verify';

import Cart from './Pages/Cart'
import PlaceOrder from './Pages/PlaceOrder'
import Footer from './components/Footer';
import SignIN from './components/SignIN';
import Myorders from './Pages/Myorders';
import Contact from "./Pages/Contact";


const App = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const menuRef = useRef(null);

  return (

    <div className='flex flex-col   gap-y-8'>
      {isSignIn ? <SignIN  setIsSignIn={setIsSignIn}/> 
      : 
      <></>}
      <div className='flex flex-col gap-y-5 '>

        <Navbar setIsSignIn = {setIsSignIn}  menuRef={menuRef}/>
        <Routes>
          <Route path='/' element={<Home menuRef={menuRef} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeOrder' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/myorders' element={<Myorders/>}/>
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <div >
        <Footer />
      </div>

    </div>
  )
}

export default App


