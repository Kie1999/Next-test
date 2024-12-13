import React from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import Layout from "../components/Layout";

async function fetchProducts(searchTerm = "") {
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

export async function generateMetadata() {
  const productTitle = "Buy High-Quality Products Online";
  const productDescription =
    "Discover our wide range of high-quality products at unbeatable prices. Shop now and enjoy fast shipping and exclusive deals!";
  const productKeywords =
    "online shopping, buy products, high-quality products, best deals, fast shipping";
  const productImage = "https://example.com/path-to-default-image.jpg";

  return {
    title: productTitle,
    description: productDescription,
    keywords: productKeywords,
    openGraph: {
      title: productTitle,
      description: productDescription,
      images: [
        {
          url: productImage,
          alt: productTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: productTitle,
      description: productDescription,
      image: productImage,
    },
  };
}

export default async function Product({ searchParams }) {
  const searchTerm = searchParams?.search || "";
  const products = await fetchProducts(searchTerm);
  return (
    <Layout>
      <SearchBar searchTerm={searchTerm} />
      <ProductList product={products.props.products} />
    </Layout>
  );
}
