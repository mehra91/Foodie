import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
const Cart = () => {
  const { cartItems, food_list, removeFromCart,getTotalAmount,url} = useContext(StoreContext);

  const cartProducts = food_list.filter(
    (item) => cartItems[item._id] > 0
  );

  const subtotal = cartProducts.reduce(
    (total, item) =>
      total + item.price * cartItems[item._id],
    0
  );

  const deliveryFee = subtotal > 0 ? 40 : 0;
  

  return (
    <div className="min-h-screen bg-gray-100  ">
 
      <div className="h-20 w-full  flex items-center justify-center text-2xl font-bold text-orange-500 ">
         Your Cart
      </div>

      {cartProducts.length > 0 ? (
        <div className="grid grid-cols-4   gap-80">

          {/* Left Side - Items */}
          <div className="col-span-2    h-auto  flex items-center justify-between flex-col gap-y-5 w-3xl">

            {cartProducts.map((item) => (
              <div
                key={item._id}
                className="bg-white w-2xl gap-y-4    h-25 rounded-xl shadow-sm gap-x-2 flex items-center justify-center  hover:shadow-md transition"
              >
                {/* Image */}
                <img
                  src={url+'/images/'+item.image}
                  alt=""
                  className="w-20 h-20 rounded-full object-cover"
                />

                {/* Info */}
                <div className="flex items-center justify-start flex-col w-sm ">
                  <h2 className="text-lg font-semibold  w-full">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 text-sm  w-full">
                    Fresh & Delicious
                  </p>

                  <p className=" font-semibold text-orange-600 w-full ">
                    ${item.price}
                  </p>
                </div>

                {/* Quantity */}
                <div className="text-center min-h-15 w-15 flex items-center justify-center flex-col">
                  <p className="text-sm text-gray-500 ">
                    Qty
                  </p>

                  <p className="font-bold text-lg ">
                    {cartItems[item._id]}
                  </p>
                </div>

                {/* Total */}
                <div className="text-center min-h-15 w-15 flex items-center justify-center flex-col ">
                  <p className="text-sm text-gray-500">
                    Total
                  </p>

                  <p className="font-bold text-green-600 ">
                    $
                    {item.price *
                      cartItems[item._id]}
                  </p>
                </div>

                {/* Delete */}
                <button
                  onClick={() =>
                    removeFromCart(item._id)
                  }
                  className="text-red-500 text-2xl hover:scale-110 transition cursor-pointer h-10 w-10 flex items-center justify-center "
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          </div>

          {/* Right Side - Bill */}
          <div className="bg-white rounded-2xl shadow-sm   h-fit gap-y-3 w-2xs flex  flex-col  items-center justify-between sticky top-6">

            <h2 className="text-2xl font-bold ">
              Price Details
            </h2>

            <div className="space-y-3 text-gray-700">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getTotalAmount()}</span>
              </div>

              <div className="flex justify-between gap-x-3  ">
                <span>Delivery Fee</span>
                <span>${deliveryFee}</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold text-black">
                <span>Total</span>
                <span>${getTotalAmount()+deliveryFee}</span>
              </div>
            </div>

            <button className=" w-3xs h-8 bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center rounded-xl font-semibold transition">
              Proceed to Checkout
            </button>

            <p className="text-xs text-gray-400 text-center ">
              Safe and secure payments
            </p>
          </div>
        </div>
      ) : (
        <div className="  flex items-center justify-center flex-col h-screen w-full gap-y-2 text-center">
          <h2 className="text-3xl/tight opacity-65  font-bold  ">
            Your Cart is Empty
          </h2>

          <p className="text-orange-500">
            Add delicious food items now

          </p>
         <Link to = "/">
          <button
           className="h-12 cursor-pointer shadow-sm w-45 border bg-orange-500 text-white font-medium text-xl capitalize rounded-3xl">
            go to Menu
          </button>
         </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;