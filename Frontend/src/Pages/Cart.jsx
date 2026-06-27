import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalAmount, url } = useContext(StoreContext);

  const cartProducts = food_list.filter(
    (item) => cartItems[item._id] > 0
  );

  const subtotal = cartProducts.reduce(
    (total, item) =>
      total + item.price * cartItems[item._id],
    0
  );

  const deliveryFee = subtotal > 0 ? 40 : 0;
  const platformFee = subtotal > 0 ? 5 : 0;
  const total = subtotal + deliveryFee + platformFee;

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">My Cart</h1>

        {cartProducts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

            {/* Left Side - Items List */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">

              {cartProducts.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 sm:p-5 border border-gray-100"
                >
                  <div className="flex gap-4 sm:gap-5">
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 sm:w-24 h-20 sm:h-24 rounded-lg object-cover bg-gray-100"
                    />

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          Fresh & Delicious
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg sm:text-xl font-bold text-gray-800">
                          ₹{item.price}
                        </span>
                      </div>
                    </div>

                    {/* Right Side - Quantity & Delete */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-700 transition p-2"
                      >
                        <MdDelete size={20} />
                      </button>

                      <div className="text-center">
                        <p className="text-xs text-gray-400 mb-1">Qty: {cartItems[item._id]}</p>
                        <p className="text-base sm:text-lg font-bold text-green-600">
                          ₹{item.price * cartItems[item._id]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Bill Summary (Sticky) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:sticky lg:top-4 space-y-4">

                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  Bill Details
                </h2>

                <div className="space-y-3 text-sm sm:text-base">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-medium">₹{deliveryFee}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Platform Fee</span>
                    <span className="font-medium">₹{platformFee}</span>
                  </div>

                  <hr className="border-dashed border-gray-200" />

                  <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-800">
                    <span>Total Amount</span>
                    <span className="text-orange-600">₹{total}</span>
                  </div>
                </div>

               

                <Link to="/placeOrder" className="w-full block">
                  <button className="w-full py-3 sm:py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition text-sm sm:text-base">
                    Proceed to Checkout
                  </button>
                </Link>

                <p className="text-xs text-gray-400 text-center">
                  Safe and Secure Payments
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col min-h-80 bg-white rounded-xl border border-gray-100">
            <div className="text-center">
              <p className="text-4xl sm:text-5xl mb-4">🛒</p>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 text-sm sm:text-base mb-6">
                Add delicious items to get started
              </p>
              <Link to="/">
                <button className="px-6 sm:px-8 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-sm sm:text-base">
                  Browse Menu
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;