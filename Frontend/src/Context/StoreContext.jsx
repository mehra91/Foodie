import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
import axios from 'axios'

export const StoreContext = createContext();
export const StoreContextProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState({});
  const url = "https://foodie-zyds.onrender.com";
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);



  useEffect(() => {

    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
        await loadcartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, [])

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    }
    else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
    if (token) {
      await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } })
    }
  }

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if (token) {
      await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } })
    }
  }

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;

  }
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFood_list(response.data.data)
  }

  const loadcartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
    if (!response.data.success) {
      // ✅ Clear bad token
      localStorage.removeItem("token");
      setToken("");
      return;
    }
    setCartItems(response.data.cartData)

  }

  const login = async (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    await loadcartData(token);
  }

  // ✅ ADD THIS
  const logout = () => {
    localStorage.removeItem('token');
    setToken("");
    setCartItems({});
  }
  // clear cart
  const clearCart = () => {
    setCartItems({});
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
    url,
    token,
    setToken,
    logout,
    login,
    clearCart

  }
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
};
