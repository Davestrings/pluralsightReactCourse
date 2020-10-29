import React from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
// import { getProducts } from "./services/productService";
import { Routes, Route } from "react-router-dom";
import Products from "./Products";
import Detail from "./Detail";
import Cart from "./Cart";

export default function App() {
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
