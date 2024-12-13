'use client';

import React, { useState, useRef } from "react";
import { useCart } from "./CartContext";
import Amway from "../image/Amway.png";

const Header = () => {
  const { cart, updateCart } = useCart();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    updateCart(updatedCart);
  };

  const handleImageError = (id) => {
    setImageErrors((prevErrors) => ({
      ...prevErrors,
      [id]: true,
    }));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <header className="banner">
      <div className="logo">My Store</div>
      <div className="cart-icon-container" onClick={toggleDropdown}>
        <span className="cart-icon">🛒</span>
        <span className="cart-count">
          {cart.reduce((total, item) => total + item.quantity, 0)}
        </span>
      </div>
      {dropdownVisible && (
        <div className="cart-dropdown" ref={dropdownRef}>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul>
                {cart.map((item, index) => (
                  <li key={index} className="cart-item">
                    <img
                      src={
                        imageErrors[item.id] || !item.thumbnail
                          ? Amway
                          : item.thumbnail
                      }
                      alt={item.title}
                      onError={() => handleImageError(item.id)}
                      className="cart-item-img"
                    />
                    <div className="cart-item-details">
                      <span>
                        {item.title} - ${item.price} x {item.quantity}
                      </span>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <strong>Total: ${totalPrice.toFixed(2)}</strong>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
