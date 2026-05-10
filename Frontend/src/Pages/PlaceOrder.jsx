import { useState, useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router";

const PlaceOrder = () => {
  const { cartItems, food_list, getTotalAmount, url, token,images,clearCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const deliveryFee = getTotalAmount() > 0 ? 20 : 0;
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

    // Build items array from cart
    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({ ...item, quantity: cartItems[item._id] }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmount() + deliveryFee,
    };

    const response = await axios.post(`${url}/api/order/place`, orderData,{headers:{token}});
    if (response.data.success) {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: response.data.amount,
    currency: response.data.currency,
    order_id: response.data.order_id,
    name: "Foodie",
    description: "Food Order Payment",
   handler: async (paymentRes) => {

  const verify = await axios.post(
    `${url}/api/order/verify`,
    {
      orderId: response.data.orderId,
      razorpay_payment_id: paymentRes.razorpay_payment_id,
      razorpay_order_id: paymentRes.razorpay_order_id,
      razorpay_signature: paymentRes.razorpay_signature,
    },
    {
      headers: { token }
    }
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
},
    prefill: {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      contact: data.phone,
    },
    theme: {
      color: "#f97316"  // orange to match your app
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();   // ✅ opens Razorpay popup instead of redirecting

} else {
  alert("SignIN first");
  
}



  };

  return (
    <form onSubmit={placeOrder} className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-sm my-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Delivery Details</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input name="firstName" onChange={onChangeHandler} value={data.firstName}
          placeholder="First Name" required
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm" />
        <input name="lastName" onChange={onChangeHandler} value={data.lastName}
          placeholder="Last Name" required
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input name="email" type="email" onChange={onChangeHandler} value={data.email}
          placeholder="Email" required
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm" />
        <input name="phone" type="tel" onChange={onChangeHandler} value={data.phone}
          placeholder="Phone Number" required
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm" />
      </div>

      <input name="street" onChange={onChangeHandler} value={data.street}
        placeholder="Street Address" required
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm mb-4" />

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input name="city" onChange={onChangeHandler} value={data.city}
          placeholder="City" required
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm" />
        <input name="state" onChange={onChangeHandler} value={data.state}
          placeholder="State" required
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <input name="zipcode" onChange={onChangeHandler} value={data.zipcode}
          placeholder="Zipcode" required
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm" />
        <input name="country" onChange={onChangeHandler} value={data.country}
          placeholder="Country" required
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm" />
      </div>

      {/* Order Summary */}
      <div className="bg-orange-50 rounded-xl px-5 py-4 mb-6 border border-orange-100">
        <h3 className="font-semibold text-gray-700 mb-2">Order Summary</h3>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span> ₹{getTotalAmount()}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Delivery Fee</span>
          <span> ₹{deliveryFee}</span>
        </div>
        <hr className="my-2 border-orange-200" />
        <div className="flex justify-between font-bold text-gray-800">
          <span>Total</span>
          <span> ₹{getTotalAmount() + deliveryFee}</span>
        </div>
      </div>

      <button type="submit"
        className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-sm transition cursor-pointer">
        Proceed to Payment →
      </button>
    </form>
  );
};

export default PlaceOrder;