import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import BotNav from "../components/BotNav";

function Main() {
  const options = ["Best Selling", "Product Name", "Newest", "Product Price"];
  const [sortBy, setSortBy] = useState(options[0]);

  const [keyword, setKeyword] = useState("");

  const [products, setProducts] = useState([]);

  const evaluateParams = () => {
    const baseParams = {}

    if (keyword) {
      baseParams.q = keyword
    }

    if (sortBy) {
      switch (sortBy) {
        case 'Product Name':
           baseParams._sort = 'name'
           break
        case 'Product Price':
          baseParams._sort = 'price'
          break
        default: break
      }
    }

    const category = null
    if (category) {
      baseParams.categoryId = category
    }

    return baseParams
  }

  const getProducts = async () => {
    const params = evaluateParams()

    await axios
      .get('http://localhost:3000/products', { params })
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    getProducts();
  }, [sortBy, keyword]);
  return (
    <>
      <div className="ms-32 py-4 flex flex-col gap-4 mr-64 h-screen relative">
        <div id="main__header" className="flex justify-between">
          <h1 id="header__title" className="font-bold text-2xl">
            Dashboard
          </h1>
          <ul id="header__tools" className="flex justify-end gap-4">
            <li>
              <select
                name=""
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 w-48 bg-[#0079FF] rounded text-white font-semibold"
              >
                {options.map((value) => (
                  <option
                    key={value}
                    value={value}
                    className="bg-white text-gray-950"
                  >
                    {value}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setKeyword(e.target.value)}
                className="px-4 w-56 h-full rounded placeholder:italic"
              />
            </li>
          </ul>
        </div>
        <ul
          id="main__products"
          className="grid grid-cols-5 mb-20 pb-4 gap-y-4 overflow-x-hidden"
        >
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard
                name={product.name}
                image={product.image}
                price={product.price}
              />
            </li>
          ))}
        </ul>
        <BotNav />
      </div>
    </>
  );
}

export default Main;
