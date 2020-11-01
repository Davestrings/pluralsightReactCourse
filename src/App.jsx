import React, { useReducer, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
// import { getProducts } from "./services/productService";
import { Routes, Route } from "react-router-dom";
import Products from "./Products";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import cartReducer from "./services/cartReducer";

let initialState;
try {
  initialState = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.log("The cart could not be parsed into JSON.");
  initialState = [];
}

export default function App() {
  // const [cart, setCart] = useState(() => {
  //   try {
  //     return JSON.parse(localStorage.getItem("cart")) ?? [];
  //   } catch {
  //     console.log("The cart could not be parsed into JSON.");
  //     return [];
  //   }
  // });

  const [cart, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // function addToCart(id, sku) {
  //   // we need to update state using existing state.
  //   //So we should use a functin to set state
  //   //since it assures we can safely reference existing states
  //   setCart((items) => {
  //     const itemInCart = items.find((i) => i.sku === sku);
  //     if (itemInCart) {
  //       // return new array with the matching item replaced
  //       return items.map((i) =>
  //         i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
  //       );
  //     } else {
  //       // return new array with the new item appended
  //       return [...items, { id, sku, quantity: 1 }];
  //     }
  //   });
  // }

  // function updateQuantity(sku, quantity) {
  //   setCart((items) => {
  //     return quantity === 0
  //       ? items.filter((i) => i.sku !== sku)
  //       : items.map((i) => (i.sku === sku ? { ...i, quantity } : i));
  //   });
  // }

  // function emptyCart() {
  //   setCart([]);
  // }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:catergoy/:id"
              // element={<Detail addToCart={addToCart} />}
              element={<Detail dispatch={dispatch} />}
            />
            <Route
              path="/cart"
              // element={<Cart cart={cart} updateQuantity={updateQuantity} />}
              element={<Cart cart={cart} dispatch={dispatch} />}
            />
            <Route
              path="/checkout"
              // element={<Checkout cart={cart} emptyCart={emptyCart} />}
              element={<Checkout cart={cart} dispatch={dispatch} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
