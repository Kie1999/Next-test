"use client";
import React, { useState } from "react";
import { format } from 'date-fns';
import { useCart } from "./CartContext";

const ProductDetail = ({ product }) => {
  const { cart, updateCart } = useCart();

  const addToCart = (product) => {
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

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {"⭐".repeat(fullStars)}
        {halfStars ? "✰" : ""}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <>
      <div className="status-title">Order</div>

      <div className="product-details">
        <div className="product-image">
          <img
            src={product.thumbnail}
            alt={`Image of ${product.title}`}
            className="image"
          />
        </div>
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="price">${product.price}</p>
          <p className="description">{product.description}</p>
          <p className="">
            <b>Category:</b> {product.category}
          </p>
          <p className="">
            <b>Brand:</b> {product.brand}
          </p>
          <p className="">
            <b>Stock:</b> {product.stock} items
          </p>
          <p className="availability">
            Availability: {product.availabilityStatus}
          </p>
          <button
            onClick={(e) => {
              addToCart(product);
            }}
            className="buy-button"
          >
            Buy Now
          </button>
        </div>
      </div>

      <h2>Reviews</h2>
      <ReviewSlider reviews={product.reviews} renderStars={renderStars} />

      <h3>Return Policy</h3>
      <p>{product.returnPolicy}</p>

      <a href="/" className="back-link">
        Back to Product List
      </a>
    </>
  );
};

export default ProductDetail;

function ReviewSlider({ reviews, renderStars }) {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % reviews.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
        (prevIndex - 3 + reviews.length) % reviews.length
      );
    };
  
    const visibleReviews = [
      reviews[currentIndex],
      reviews[(currentIndex + 1) % reviews.length],
      reviews[(currentIndex + 2) % reviews.length],
    ];
  
    return (
      <div className="review-slider">
        <button className="slider-button prev" onClick={prevSlide}>
          ◀
        </button>
        <div className="review-container">
          {visibleReviews.map((review, index) => (
            <div className="review" key={index}>
              <p className="reviewer-name">
                <strong>{review.reviewerName}</strong>
              </p>
              <p className="rating">{renderStars(review.rating)}</p>
              <p className="comment">{review.comment}</p>
              <p className="date">
                <small>{format(new Date(review.date), 'MM/dd/yyyy')}</small>
              </p>
            </div>
          ))}
        </div>
        <button className="slider-button next" onClick={nextSlide}>
          ▶
        </button>
      </div>
    );}
