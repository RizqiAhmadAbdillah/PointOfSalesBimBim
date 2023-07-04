import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import BotNav from "../components/BotNav";
import { useDispatch, useSelector } from "react-redux";
import { ALL_CATEGORY } from "../enums";
import { addToCart } from "../features/cartSlice";
import Cart from "../components/Cart";
import Button from "../components/Button";
import SortDescSvg from "../assets/SortDescSvg";
import SortAscSvg from "../assets/SortAscSvg";

function Dashboard() {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.cart.category);
  const options = ["Best Selling", "Name", "Newest", "Price"];
  const [sortBy, setSortBy] = useState(options[0]);
  const [keyword, setKeyword] = useState("");
  const [isDescending, setIsDescending] = useState(true);

  const [products, setProducts] = useState([]);

  const evaluateParams = () => {
    const baseParams = {};
    if (isDescending) {
      baseParams._order = "desc";
    }
    if (keyword) {
      baseParams.q = keyword;
    }
    if (sortBy) {
      switch (sortBy) {
        case "Best Selling": {
          baseParams._sort = "id";
          break;
        }
        case "Name": {
          baseParams._sort = "name";
          break;
        }
        case "Newest": {
          baseParams._sort = "id";
          break;
        }
        case "Price": {
          baseParams._sort = "price";
        }
        default:
          break;
      }
    }
    if (category !== ALL_CATEGORY) {
      baseParams.categoryId = category;
    }
    return baseParams;
  };
  const getProducts = async () => {
    const params = evaluateParams();
    await axios
      .get("http://localhost:3000/products", { params })
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    getProducts();
  }, [sortBy, keyword, category, isDescending]);
  return (
    <>
      <div className="w-2/3 ms-32 flex flex-col gap-4 relative">
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
              <Button
                variant="secondary"
                iconLeft={isDescending ? <SortDescSvg /> : <SortAscSvg />}
                onClick={() => setIsDescending(!isDescending)}
              />
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
        <div className="flex overflow-x-hidden mb-24">
          <main className="flex flex-col justify-between w-full">
            <ul
              id="main__products"
              className="grid grid-cols-4 mb-4 py-4 gap-4 overflow-x-hidden"
            >
              {products.map((product) => (
                <li
                  key={product.id}
                  onClick={() =>
                    dispatch(
                      addToCart({
                        ...product,
                        quantity: 1,
                      })
                    )
                  }
                >
                  <ProductCard
                    name={product.name}
                    image={product.image}
                    price={product.price}
                  />
                </li>
              ))}
            </ul>
          </main>
        </div>
        <BotNav />
      </div>
      <Cart />
    </>
  );
}

export default Dashboard;
