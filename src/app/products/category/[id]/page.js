import "../../[id]/ProductDetail.css";

import React from "react";
import Layout from "../../../components/Layout";
import SearchBar from "../../../components/SearchBar";
import ProductList from "../../../components/ProductList"

// Function to fetch product details
async function getProduct(id) {
  try {
    const res = await fetch(`https://dummyjson.com/products/category/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    return { props: { products: data.products || [] } }; // ส่งข้อมูลไปยังหน้า
  } catch (error) {
    console.error("Error fetching products:", error);
    return { props: { products: [] } }; // ส่ง array ว่างเมื่อเกิดข้อผิดพลาด
  }
}

async function searchProducts(searchTerm = "") {
  try {
    const res = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    return { props: { products: data.products || [] } }; // ส่งข้อมูลไปยังหน้า
  } catch (error) {
    console.error("Error fetching products:", error);
    return { props: { products: [] } }; // ส่ง array ว่างเมื่อเกิดข้อผิดพลาด
  }
}

// Function to generate SEO metadata
export async function generateMetadata() {
  const categoryId = 'Category-products'; // ใช้ categoryId จาก params


  return {
    title: `${categoryId} - Explore Our Products`,
    icons: {
      icon: '../../../store.png',
    },
    description: `Browse our selection of products in the ${categoryId} category. Discover top deals and quality products! Discover our wide range of high-quality products at unbeatable prices.`,
    keywords: `${categoryId}, products, online shopping, best deals`,
    openGraph: {
      title: `${categoryId} - Explore Our Products`,
      description: `Shop top-quality products in the ${categoryId} category at unbeatable prices.`,
      images: [
        {
          url: 'https://example.com/default-category-image.jpg', // รูปภาพหมวดหมู่
          alt: `${categoryId} category`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryId} - Explore Our Products`,
      description: `Find amazing products in the ${categoryId} category.`,
      image: 'https://example.com/default-category-image.jpg',
    },
  };
}

// Component to display product details
export default async function ProductByCategories({ params,searchParams }) {
  const { id } = params;
  const searchTerm = searchParams?.search || "";
  let product = [] ;
  try {
    if(searchTerm){
      product = await searchProducts(searchTerm);
    }else{
      product = await getProduct(id);
    }
    
    return (
      <Layout>
        <SearchBar searchTerm={searchTerm} />
        <ProductList product={product.props.products}></ProductList>
      </Layout>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return <h1>Error: Unable to load product details</h1>;
  }
}
