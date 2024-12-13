'use client'
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ product }) => {
  return (
    <div className="product-list">
      {product.map((product, index) => (
        <ProductCard key={index} product={product}/>
      ))}
    </div>
  );
};

export default ProductList;
