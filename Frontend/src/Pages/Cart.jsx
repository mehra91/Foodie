import React, { useContext } from 'react'
import { Link } from 'react-router'
import {StoreContext} from '../Context/StoreContext'

const Cart = () => {
  const{cartItems,food_list,removeFromCart} = useContext(StoreContext);
  
  return (
   
    <div>
      <div>
      <p>Items </p>
      <p>Title</p>
      <p>Price</p>
      <p>Quantity </p>
      <p>Total</p>
      <p>Remove</p>
    </div>
    <br />
    <hr />
    {
    food_list.map((item,index)=>{
      if(cartItems[item._id]>0){
        return(
          <p>
            {item.name}
          </p>
        )
      }
    })
    }
    </div>
    
  )
}

export default Cart