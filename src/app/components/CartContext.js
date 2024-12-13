'use client'
import React, { createContext, useState, useContext ,useEffect} from "react";

// สร้าง Context
const CartContext = createContext();

// Provider สำหรับการจัดการสถานะ
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook เพื่อใช้งาน Context
export const useCart = () => useContext(CartContext);

