import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ALL_CATEGORY } from "../enums";
import Button from "../components/Button";
import SortDescSvg from "../assets/SortDescSvg";
import SortAscSvg from "../assets/SortAscSvg";
import CloseSvg from "../assets/CloseSvg";
import AddSvg from "../assets/AddSvg";

function Products() {
  const category = useSelector((state) => state.cart.category);
  const options = ["Newest", "Name", "Price", "Stock"];
  const [sortBy, setSortBy] = useState(options[0]);
  const [keyword, setKeyword] = useState("");
  const [isDescending, setIsDescending] = useState(true);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddProduct, setIsAddProduct] = useState(true);
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
        case "Newest": {
          baseParams._sort = "id";
          break;
        }
        case "Name": {
          baseParams._sort = "name";
          break;
        }
        case "Price": {
          baseParams._sort = "price";
        }
        case "Stock": {
          baseParams._sort = "stock";
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
  const [productDetail, setProductDetail] = useState({});

  const getProductDetail = async (productId) => {
    await axios
      .get(`http://localhost:3000/products/${productId}`)
      .then((response) => setProductDetail(response.data))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    getProducts();
    getProductDetail();
  }, [sortBy, keyword, category, isDescending, isDetailOpen, isModalOpen]);
  return (
    <>
      <div
        className={`${
          isDetailOpen ? "w-2/3" : "w-full"
        } ms-32 flex flex-col gap-4 relative`}
      >
        <div id="main__header" className="flex justify-between">
          <h1 id="header__title" className="font-bold text-2xl">
            Products
          </h1>
          <ul id="header__tools" className="flex justify-end gap-4">
            <li>
              <Button
                variant="success"
                text="Add Product"
                iconLeft={<AddSvg />}
                onClick={() => {
                  setIsAddProduct(true);
                  setIsModalOpen(true);
                }}
              />
            </li>
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
        <main className="bg-white rounded-xl p-4 max-h-[calc(100vh-88px)]">
          <table className="table-auto capitalize w-full">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th className="p-2 text-center">#</th>
                <th className="p-2 text-left">name</th>
                <th className="p-2 text-left">price</th>
                <th className="p-2 text-left">stock</th>
                <th className="p-2 text-left">actions</th>
              </tr>
            </thead>
          </table>
          <div className="max-h-[calc(80vh-4px)] overflow-y-auto">
            <table className="table-auto capitalize w-full">
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product.id}
                    className="odd:bg-gray-100 even:bg-white"
                  >
                    <td className="text-center font-semibold">{++index}</td>
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">{`Rp.${product.price}`}</td>
                    <td className="p-2">{product.stock}</td>
                    <td className="flex gap-2 justify-center p-2">
                      <Button
                        text="Detail"
                        variant="info"
                        onClick={() => {
                          getProductDetail(product.id);
                          setIsDetailOpen(true);
                        }}
                        className="px-2 py-1 text-sm"
                      />
                      <Button
                        text="Edit"
                        variant="primary"
                        onClick={() => {
                          setIsAddProduct(false);
                          setIsModalOpen(true);
                        }}
                        className="px-2 py-1 text-sm"
                      />
                      <Button
                        text="Delete"
                        variant="danger"
                        className="px-2 py-1 text-sm"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      {isModalOpen ? (
        <div className="fixed top-0 left-0 w-screen h-screen z-20 bg-black/40 flex justify-center items-center">
          <div className="h-2/3 w-1/2 p-2 rounded-3xl bg-white relative">
            <div id="order__header" className="flex justify-center relative">
              <h1 id="order__title" className="font-bold text-2xl text-center">
                {`${isAddProduct ? "Add" : "Edit"} Product`}
              </h1>
              <div
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer absolute top-0 right-1 px-2 py-1 rounded bg-[#FF0060]"
              >
                <CloseSvg />
              </div>
            </div>
            <aside className="flex flex-col gap-2 mt-4 p-2">
              <form action="" className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="border border-gray-400 rounded p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="image">Image</label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    className="border border-gray-400 rounded p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    min="0"
                    id="price"
                    name="price"
                    className="border border-gray-400 rounded p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    min="0"
                    id="stock"
                    name="stock"
                    className="border border-gray-400 rounded p-2"
                  />
                </div>
                <Button
                  variant={`${isAddProduct ? "primary" : "success"}`}
                  text={`${isAddProduct ? "Submit" : "Save"}`}
                />
              </form>
            </aside>
          </div>
        </div>
      ) : (
        ""
      )}

      {isDetailOpen ? (
        <div className="w-1/3 mb-4 p-2 rounded-3xl bg-white relative">
          <div id="order__header" className="flex justify-center relative">
            <h1 id="order__title" className="font-bold text-2xl text-center">
              {productDetail.name}
            </h1>
            <div
              onClick={() => setIsDetailOpen(false)}
              className="cursor-pointer absolute top-0 right-1 px-2 py-1 rounded bg-[#FF0060]"
            >
              <CloseSvg />
            </div>
          </div>
          <aside className="flex flex-col gap-2 mt-4 p-2">
            <img
              src={productDetail.image}
              alt={productDetail.name}
              className="w-full object-cover rounded-xl"
            />
            <h2 className="font-semibold">{`Price: Rp.${productDetail.price}`}</h2>
            <h2 className="font-semibold">{`Stock: ${productDetail.stock}`}</h2>
          </aside>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Products;
