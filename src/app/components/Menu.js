"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Menu = ({ categories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isProductsOpen, setIsProductsOpen] = useState(false); // สถานะเมนูเปิด/ปิด

  // ฟังก์ชันสำหรับเปิด/ปิดเมนู Products
  const toggleProductsMenu = (e) => {
    e.preventDefault(); // ป้องกันการลิงก์ทำงานเมื่อคลิกที่ไอคอนลูกศร
    setIsProductsOpen(!isProductsOpen);
  };
  
  const handleNavigation = (path) => {
    router.push(path); // ใช้ router.push เพื่อเปลี่ยนหน้า
  };
  return (
    <aside className="menu">
      <ul>
        <li className="li-products">
        <span
            onClick={() => handleNavigation("/")}
            className={pathname === "/" ? "active menu-item" : "menu-item"}
          >
            Products
          </span>
          <span onClick={toggleProductsMenu} className="chevron-icon">
            {isProductsOpen ? "▲" : "▼"}
          </span>
        </li>
        {/* แสดงหมวดหมู่เมื่อเมนู Products เปิด */}
        {isProductsOpen && (
          <ul className="category-list">
            {categories.map((category, index) => (
               <li
               key={index}
               className={
                 pathname === `/products/category/${category.slug}`
                   ? "active category-item"
                   : "category-item"
               }
               onClick={() => handleNavigation(`/products/category/${category.slug}`)}
             >
               <span >
                 {category.name}
               </span>
             </li>
            ))}
          </ul>
        )}
      </ul>
    </aside>
  );
};

export default Menu;
