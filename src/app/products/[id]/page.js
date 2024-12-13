import "./ProductDetail.css";

import React from "react";
import Layout from "../../components/Layout";
import ProductDetail from "../../components/ProductDetail"

// Function to fetch product details
async function getProduct(id) {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
}

// Function to generate SEO metadata
export async function generateMetadata({ params }) {
  const { id } = params;
  const product = await getProduct(id);

  return {
    title: `${product.title} - Buy Products Online`,
    description: product.description,
    keywords: product.tags.join(", "),
    openGraph: {
      title: `${product.title} - Buy Products Online`,
      description: product.description,
      images: [
        {
          url: product.thumbnail,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} - Buy Products Online`,
      description: product.description,
      image: product.thumbnail,
    },
  };
}

// Component to display product details
export default async function Product({ params }) {
  const { id } = params;

  try {
    const product = await getProduct(id);
    return (
      <Layout>
        <ProductDetail product={product}></ProductDetail>
      </Layout>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return <h1>Error: Unable to load product details</h1>;
  }
}
