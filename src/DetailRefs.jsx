import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";

export default function Detail(props) {
  const skuRef = useRef();
  //   const [sku, setSku] = useState("");
  const { id } = useParams();
  const navigate = useNavigate(); // helps to redirect
  const { data: product, error, loading } = useFetch(`products/${id}`);

  // order of call is important.
  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />; // displays if product id does not exist
  if (error) throw error;
  //   return <h1>Detail</h1>;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>

      <select id="size" ref={skuRef}>
        <option value="">Pick size</option>
        {product.skus.map((itemSize, index) => (
          <option key={itemSize.sku} value={itemSize.sku}>
            {itemSize.size}
          </option>
        ))}
      </select>

      <p>
        <button
          className="btn btn-primary"
          //   disabled={!sku}
          onClick={() => {
            const sku = skuRef.current.value;
            if (!sku) return alert("please fill the form");
            props.addToCart(id, sku);
            navigate("/cart");
          }}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
