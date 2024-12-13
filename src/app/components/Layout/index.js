import React from "react";
import Menu from "../Menu";
import Header from "../Header";
import { CartProvider } from "../CartContext";

async function fetchCategories() {
    try {
      const res = await fetch("https://dummyjson.com/products/categories");
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();
      return { props: { categories: data || [] } }; // ส่งข้อมูลไปยังหน้า
    } catch (error) {
      console.error("Error fetching products:", error);
      return { props: { categories: [] } }; // ส่ง array ว่างเมื่อเกิดข้อผิดพลาด
    }
  }

export default async function Layout({ children}) {
    const categories = await fetchCategories();
    // console.log('categories :',  categories)
    return (
        <CartProvider>
          <div className="container">
            <Header />
            <div className="content-container">
              <Menu categories={categories.props.categories}/>
              <main className="main-panel">
                {children}
              </main>
            </div>
          </div>
        </CartProvider>
      );
}