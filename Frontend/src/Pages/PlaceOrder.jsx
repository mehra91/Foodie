import { useState, useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router";

const PlaceOrder = () => {
  const { cartItems, food_list, getTotalAmount, url, token, images, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const deliveryFee = getTotalAmount() > 0 ? 40 : 0;
  const platformFee = getTotalAmount() > 0 ? 5 : 0;
  
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "India"
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    // Check if user is signed in
    if (!token) {
      alert("You are not signed in. Please sign in first.");
      navigate('/');
      return;
    }

    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({ ...item, quantity: cartItems[item._id] }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmount() + deliveryFee + platformFee,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token }
      });

      if (response.data.success) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: response.data.amount,
          currency: response.data.currency,
          order_id: response.data.order_id,
          name: "Foodie",
          description: "Food Order Payment",
          handler: async (paymentRes) => {
            try {
              const verify = await axios.post(
                `${url}/api/order/verify`,
                {
                  orderId: response.data.orderId,
                  razorpay_payment_id: paymentRes.razorpay_payment_id,
                  razorpay_order_id: paymentRes.razorpay_order_id,
                  razorpay_signature: paymentRes.razorpay_signature,
                },
                { headers: { token } }
              );

              if (verify.data.success) {
                clearCart();
                navigate("/verify", {
                  state: {
                    orderData: verify.data.order,
                    orderId: response.data.orderId,
                  },
                });
              } else {
                alert("Payment verification failed!");
                navigate("/");
              }
            } catch (err) {
              alert("Verification error!");
            }
          },
          prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            contact: data.phone,
          },
          theme: { color: "#f97316" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

      } else {
        alert(response.data.message);
      }

    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Delivery Details</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

          {/* Form - Left Side */}
          <form onSubmit={placeOrder} className="lg:col-span-2 space-y-4">

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <input name="firstName" onChange={onChangeHandler} value={data.firstName}
                  placeholder="John" required
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 cursor-text" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <input name="lastName" onChange={onChangeHandler} value={data.lastName}
                  placeholder="Doe" required
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 cursor-text" />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input name="email" type="email" onChange={onChangeHandler} value={data.email}
                  placeholder="john@example.com" required
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 cursor-text" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input name="phone" type="tel" onChange={onChangeHandler} value={data.phone}
                  placeholder="9876543210" required
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 cursor-text" />
              </div>
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Street Address
              </label>
              <input name="street" onChange={onChangeHandler} value={data.street}
                placeholder="123 Main Street" required
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 cursor-text" />
            </div>

            {/* City & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  City
                </label>
                <input name="city" onChange={onChangeHandler} value={data.city}
                  placeholder="Aligarh" required
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 cursor-text" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  State
                </label>
                <input name="state" onChange={onChangeHandler} value={data.state}
                  placeholder="Uttar Pradesh" required
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 cursor-text" />
              </div>
            </div>

            {/* Zipcode & Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Zipcode
                </label>
                <input name="zipcode" onChange={onChangeHandler} value={data.zipcode}
                  placeholder="202001" required
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 cursor-text" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Country
                </label>
                <input name="country" onChange={onChangeHandler} value={data.country}
                  placeholder="India" required
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 cursor-text" />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit"
              className="w-full py-3 sm:py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition text-sm sm:text-base mt-6 cursor-pointer">
              Proceed to Payment →
            </button>
          </form>

          {/* Bill Summary - Right Side (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:sticky lg:top-4 space-y-4">

              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{getTotalAmount()}</span>
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
                  <span>Total</span>
                  <span className="text-orange-600">₹{getTotalAmount() + deliveryFee + platformFee}</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 text-xs sm:text-sm text-blue-700">
                ✓ Safe & Secure Payment
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;