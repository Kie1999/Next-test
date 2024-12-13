"use client";
import React, { useState } from "react";
import { useCart } from "./CartContext";
import Link from "next/link";
import Amway from "../image/Amway.png";

const ProductCard = ({ product }) => {
  const { cart, updateCart } = useCart();
  const [imageError, setImageError] = useState(false);

  const handleError = () => {
    setImageError(true);
  };

  const addToCart = (e, product) => {
    e.stopPropagation(); // Prevent the Link from being triggered
    const existingProductIndex = cart.findIndex(
      (item) => item.title === product.title
    );
    let updatedCart;
    if (existingProductIndex !== -1) {
      updatedCart = cart.map((item, index) =>
        index === existingProductIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    updateCart(updatedCart);
  };

  return (
    <div className="product">
      <Link href={`/products/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.name}
          loading="lazy"
          priority='true'
          width="198" height="198"
        />
        <div className="product-name">{product.title}</div>
        <div className="product-description">{product.description}</div>
        <div className="product-price">
          <span>Price:</span> ${product.price}
        </div>{" "}
      </Link>
      <button
        onClick={(e) => addToCart(e, product)}
        className="add-to-cart-btn"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
