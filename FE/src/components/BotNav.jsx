import axios from "axios";
import React, { useEffect, useState } from "react";

function BotNav() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    await axios
      .get("http://localhost:3000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error.message));
  };
  const [productsByCategoryId, setProductsByCategoryId] = useState([]);
  const getProductsByCategoryId = async () => {
    await axios
      .get(`http://localhost:3000/categories?_embed=products`)
      .then((response) => {
        setProductsByCategoryId(response.data);
      })
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    getProducts();
    getProductsByCategoryId();
  }, []);
  return (
    <>
      <div
        id="sort__categories"
        className="absolute left-0 bottom-0 w-full h-24 bg-white rounded-t-3xl drop-shadow-[0_-2px_2px_rgba(0,0,0,0.1)]"
      >
        <div className="flex justify-between px-24 py-8">
          <button autoFocus className="font-bold text-lg border-b-2 border-b-white focus:border-b-gray-950">
            All ({products.length})
          </button>
          {productsByCategoryId.map((category) => (
            <button
              key={category.id}
              className="font-bold text-lg border-b-2 border-b-white focus:border-b-gray-950"
            >
              {category.name} ({category.products.length})
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default BotNav;
