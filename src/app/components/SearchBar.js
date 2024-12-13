'use client';
import React, { useRef } from "react";
import { useRouter } from "next/navigation";

const SearchBar = ({ searchTerm }) => {
  const router = useRouter();
  const inputRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = inputRef.current.value.trim();
    router.push(`/products${query ? `?search=${query}` : ""}`);
  };

  return (
    <form onSubmit={handleSearch} style={{width:"100%"}}>
      <div className="search-bar">
      <div className="search-bar-content">
        <input
          type="text"
          ref={inputRef}
          defaultValue={searchTerm || ""}
          placeholder="Search products..."
        />
        <button type="submit">Search</button> 
      </div>
    </div>
    </form>
    
  );
};

export default SearchBar;
