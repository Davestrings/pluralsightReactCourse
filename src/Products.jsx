import React, { useState } from "react";
// import { getProducts } from "./services/productService";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";

// const products = [
//   {
//     id: 1,
//     category: "shoes",
//     image: "shoe1.jpg",
//     name: "Hiker",
//     price: 94.95,
//     skus: [
//       { sku: "17", size: 7 },
//       { sku: "18", size: 8 },
//     ],
//     description: "This rugged boot will get you up the mountain safely.",
//   },
//   {
//     id: 2,
//     category: "shoes",
//     image: "shoe2.jpg",
//     name: "Climber",
//     price: 78.99,
//     skus: [
//       { sku: "28", size: 8 },
//       { sku: "29", size: 9 },
//     ],
//     description: "Sure-footed traction in slippery conditions.",
//   },
//   {
//     id: 3,
//     category: "shoes",
//     image: "shoe3.jpg",
//     name: "Explorer",
//     price: 145.95,
//     skus: [
//       { sku: "37", size: 7 },
//       { sku: "38", size: 8 },
//       { sku: "39", size: 9 },
//     ],
//     description: "Look stylish while stomping in the mud.",
//   },
// ];
export default function Products() {
  const [size, setSize] = useState("");

  // useEffect(() => {
  //   getProducts("shoes")
  //     .then((response) => setProducts(response))
  //     .catch((e) => setError(e))
  //     .finally(() => setLoading(false));
  // }, []); // making api call with javascript promises

  // useEffect(() => {
  //   async function init() {
  //     try {
  //       const response = await getProducts("shoes");
  //       setProducts(response);
  //     } catch (e) {
  //       setError(e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   init();
  // }, []); //making api call using async await

  const { data: products, loading, error } = useFetch(
    "products?category=shoes"
  );

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  const filteredProducts = size
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
    : products;

  if (error) throw error;
  if (loading) return <Spinner />;

  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        {size && <h2>{filteredProducts.length} products were found</h2>}
      </section>
      {/* The map method automatically passes each 
          item to the function. it called a "point free style" */}
      <section id="products">{filteredProducts.map(renderProduct)}</section>
    </>
  );
}
