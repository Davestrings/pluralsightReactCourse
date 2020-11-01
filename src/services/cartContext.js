import React, { useReducer, useEffect, createContext, useContext } from "react";
import cartReducer from "./cartReducer";

// no need to export this context since the useCart hook now serve as the api for this context
const cartContext = createContext(null);

let initialState;
try {
  initialState = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.log("The cart could not be parsed into JSON.");
  initialState = [];
}

export function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <cartContext.Provider value={{ cart, dispatch }}>
      {props.children}
    </cartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider. Wrap a  parent component in <CartProvider> to fix this error."
    );
  }
  return context;
}
