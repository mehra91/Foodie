import { useLocation, useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import { StoreContext } from "../Context/StoreContext";


const Verify = () => {
  const {url} = useContext(StoreContext);

  const navigate = useNavigate();
  const location = useLocation();

  const orderData = location.state?.orderData;
  const orderId = location.state?.orderId;

  useEffect(() => {
    if (!orderData) {
      navigate("/");
    }
  }, []);

  if (!orderData) return null;

  const deliveryFee = 20;
  const subtotal = orderData.amount - deliveryFee;

  return (
    <div className="min-h-screen bg-[#faf8f5] flex justify-center py-10 px-4">
      <div className="bg-white rounded-3xl max-w-md w-full border border-gray-100 overflow-hidden">

        {/* Header */}
        <div className="bg-orange-50 p-8 text-center border-b border-dashed border-orange-200">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5"/>
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Order Confirmed!
          </h1>

          <p className="text-orange-500 text-sm font-medium">
            Your food is on its way 🛵
          </p>

          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mt-3 border border-orange-200">
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              Order
            </span>

            <span className="text-xs font-bold text-orange-500">
              #{orderId?.slice(-6).toUpperCase()}
            </span>

            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>

            <span className="text-xs font-semibold text-green-500">
              Paid
            </span>
          </div>
        </div>

        <div className="p-6 space-y-5">

          {/* Delivery Address */}
          <div className="bg-[#faf8f5] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">
                Delivering to
              </span>
            </div>

            <p className="text-sm font-semibold text-gray-800 mb-1">
              {orderData.address.firstName} {orderData.address.lastName}
            </p>

            <p className="text-xs text-gray-400 leading-relaxed ">
              {orderData.address.street}, {orderData.address.city},
              <br/>
              {orderData.address.state} — {orderData.address.zipcode}
              <br/>
              +91{orderData.address.phone}
            </p>
          </div>

          {/* Ordered Items */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Items Ordered
            </p>

            <div className="space-y-3">
              {orderData.items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">

                    <img
                      src={`${url}/images/${item.image}`}
                      alt={item.name}
                      className="w-10 h-10 rounded-xl object-cover bg-orange-50"
                    />

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {item.name}
                      </p>

                      <p className="text-xs text-gray-400">
                        x{item.quantity}
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-semibold text-gray-800">
                    ₹ {item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bill Summary */}
          <div>
            <hr className="border-dashed border-gray-200 my-2"/>

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Bill Summary
            </p>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Subtotal</span>
                <span className="text-sm text-gray-800">₹ {subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Delivery Fee</span>
                <span className="text-sm text-gray-800">₹ {deliveryFee}</span>
              </div>

              <hr className="border-dashed border-gray-200"/>

              <div className="flex justify-between">
                <span className="text-base font-bold text-gray-800">
                  Total Paid
                </span>

                <span className="text-base font-bold text-orange-500">
                  ₹ {orderData.amount}
                </span>
              </div>
            </div>
          </div>

          {/* ETA */}
          <div className="flex justify-between items-center bg-[#faf8f5] rounded-xl px-4 py-3">
            <span className="text-sm text-gray-500">
              ⏱ Estimated Delivery
            </span>

            <span className="text-sm font-bold text-gray-800">
              30–40 mins
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">

            <button
              onClick={() => navigate("/")}
              className="flex-1 py-3 border-2 border-orange-500 text-orange-500 rounded-xl font-semibold text-sm hover:bg-orange-50 transition cursor-pointer"
            >
              Back to Home
            </button>

            <button
              onClick={() => navigate("/Myorders")}
              className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-sm transition cursor-pointer"
            >
              Track Order
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Verify;