import { useEffect, useState, useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import axios from "axios";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(`${url}/api/order/userorders`, {},
      { headers: { token } }
    );
    if (response.data.success) {
      setOrders(response.data.data.reverse());
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="min-h-98 bg-[#faf8f5] py-6 sm:py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-400 mt-12 sm:mt-20">
            <p className="text-2xl sm:text-4xl mb-2 sm:mb-3">🍽️</p>
            <p className="text-base sm:text-lg font-medium">No orders yet!</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {orders.map((order) => (
              <div key={order._id}
                className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-5 shadow-sm">

                {/* Order Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Order ID</p>
                    <p className="text-xs sm:text-sm font-bold text-orange-500">
                      #{order._id.slice(-6).toUpperCase()}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Date</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                      {new Date(order.date).toLocaleDateString('en-IN', {
                        day:'numeric', month:'short', year:'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2 mb-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <img src={item.image} alt={item.name}
                          className="w-8 sm:w-10 h-8 sm:h-10 rounded-xl object-cover bg-orange-50 shrink-0"/>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                          <p className="text-xs text-gray-400">x{item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-700 shrink-0">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <hr className="border-dashed border-gray-200 mb-4"/>

                {/* Address */}
                <div className="flex items-start gap-2 mb-4">
                  <svg className="w-3 sm:w-4 h-3 sm:h-4 text-orange-400 mt-0.5 shrink-0" fill="none"
                    stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {order.address.street}, {order.address.city},
                    {order.address.state} — {order.address.zipcode}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      order.payment ? 'bg-green-500' : 'bg-red-400'
                    }`}></span>
                    <span className="text-xs font-medium text-gray-500">
                      {order.payment ? 'Paid' : 'Unpaid'}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs font-medium text-orange-500">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-gray-800">₹{order.amount}</p>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyOrders;