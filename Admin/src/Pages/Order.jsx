import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ORDER_STATUSES = ["Food Processing", "Out for Delivery", "Delivered"];

const statusStyle = {
  "Food Processing": "bg-amber-50 text-amber-600",
  "Out for Delivery": "bg-blue-50 text-blue-600",
  "Delivered":        "bg-green-50 text-green-600",
};

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      setOrders(response.data.data.reverse());
    } else {
      toast.error("Failed to load orders");
    }
  };

  const updateStatus = async (orderId, status) => {
    const response = await axios.post(`${url}/api/order/status`, { orderId, status });
    if (response.data.success) {
      toast.success("Status updated!");
      fetchAllOrders();
    }
  };

  useEffect(() => { fetchAllOrders(); }, []);

  const total    = orders.length;
  const processing = orders.filter(o => o.status === "Food Processing").length;
  const delivered  = orders.filter(o => o.status === "Delivered").length;
  const revenue    = orders.reduce((a, o) => a + o.amount, 0);

  return (
    <div className="p-3 sm:p-6 w-full max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Admin Panel</p>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">All Orders</h1>
        </div>
        <button onClick={fetchAllOrders}
          className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-600 hover:bg-gray-50 transition cursor-pointer whitespace-nowrap">
          ↻ Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
        {[
          { label: "Total Orders",  value: total,          color: "text-gray-800"  },
          { label: "Processing",    value: processing,     color: "text-amber-500" },
          { label: "Delivered",     value: delivered,      color: "text-green-500" },
          { label: "Revenue",       value: `₹${revenue.toLocaleString('en-IN')}`, color: "text-gray-800" },
        ].map(stat => (
          <div key={stat.label} className="bg-gray-50 rounded-2xl p-2 sm:p-4">
            <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-lg sm:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Orders */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {orders.map((order) => (
          <div key={order._id}
            className="bg-white border border-gray-100 rounded-2xl p-3 sm:p-5 shadow-sm">

            {/* Top row */}
            <div className="flex items-start justify-between gap-2 sm:gap-4 flex-wrap mb-3 sm:mb-4">
              <div className="flex items-start gap-2 sm:gap-3 min-w-0">
                <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-semibold text-xs sm:text-sm shrink-0">
                  {order.address.firstName[0]}{order.address.lastName[0]}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 text-xs sm:text-sm">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {order.address.street}, {order.address.city}, {order.address.state}
                  </p>
                  <p className="text-xs text-gray-400">{order.address.phone}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className={`text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium ${statusStyle[order.status]}`}>
                  {order.status}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(order.date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="border-t border-gray-100 pt-2 sm:pt-3 mb-3 sm:mb-4">
              <p className="text-xs font-semibold text-gray-400 mb-2">Items ordered</p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {order.items.map((item, i) => (
                  <span key={i}
                    className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2 sm:px-3 py-0.5 sm:py-1 text-gray-700">
                    {item.name} x{item.quantity}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3">
              <div className="flex items-center gap-1 sm:gap-3 flex-wrap">
                <span className="text-sm sm:text-base font-bold text-gray-800">
                  ₹{order.amount.toLocaleString('en-IN')}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-lg font-medium ${
                  order.payment ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                }`}>
                  {order.payment ? '✓ Paid' : '✗ Unpaid'}
                </span>
                <span className="text-xs text-gray-400">
                  #{order._id.slice(-6).toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                <label className="text-xs text-gray-400">Status</label>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="text-xs border border-gray-200 rounded-xl px-2 sm:px-3 py-1 sm:py-1.5 outline-none focus:border-orange-400 cursor-pointer bg-white">
                  {ORDER_STATUSES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;