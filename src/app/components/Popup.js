'use client';

import React, { useState } from 'react';

export default function Popup() {
  const [isVisible, setIsVisible] = useState(false);
  const [product, setProduct] = useState(null);

  const openPopup = (selectedProduct) => {
    setProduct(selectedProduct);
    setIsVisible(true);
  };

  const closePopup = () => {
    setIsVisible(false);
    setProduct(null);
  };

  return (
    isVisible && (
      <div className="popup">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <button onClick={closePopup}>Close</button>
      </div>
    )
  );
}
