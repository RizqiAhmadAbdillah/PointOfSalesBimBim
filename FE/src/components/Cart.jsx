import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseItemQuantity,
  lowerItemQuantity,
  removeFromCart,
  resetCart,
} from "../features/cartSlice";
import Button from "./Button";
import TrashSvg from "../assets/TrashSvg";
import axios from "axios";
import Swal from "sweetalert2";

function Cart() {
  const dispatch = useDispatch();
  const [paid, setPaid] = useState(0);
  const products = useSelector((state) => state.cart.items);
  const totalProducts = useSelector((state) => state.cart.totalProducts);
  const isEmpty = totalProducts == 0;
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const change = paid - totalPrice;

  const clickHandler = async () => {
    const transactions = {
      charged_amount: totalPrice,
      paid_amount: Number(paid),
      change_amount: change,
    };
    try {
      const tr = await axios.post(
        "http://localhost:3000/transactions",
        transactions
      );
      for (let product of products) {
        const transaction_details = {
          productId: product.id,
          transactionId: tr.data.id,
          quantity: product.quantity,
          subtotal: product.quantity * product.price,
        };
        await axios.post(
          "http://localhost:3000/transaction_details",
          transaction_details
        );
      }
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your order has been saved",
        confirmButtonText: "Ok",
      });
      dispatch(resetCart());
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please wait a moment while we fix the issue",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <>
      <div className="w-1/3 mb-4 p-2 rounded-3xl bg-white relative">
        <div id="order__header" className="flex justify-center">
          <h1 id="order__title" className="font-bold text-2xl text-center">
            Order
          </h1>
        </div>
        {isEmpty ? (
          <p className="flex justify-center items-center h-5/6 text-center text-lg">
            Cart is empty
          </p>
        ) : (
          <ul className="flex flex-col justify-start gap-4 overflow-x-hidden h-5/6 pb-8">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between p-2 gap-4 border-b border-b-gray-200"
              >
                <div
                  id="tr__wrapper"
                  className="flex justify-between items-center gap-4 w-full"
                >
                  <div
                    id="tr__remove"
                    onClick={() => dispatch(removeFromCart(item))}
                    className="p-4 rounded bg-[#FF0060]"
                  >
                    <TrashSvg />
                  </div>
                  <div className="flex flex-grow justify-between gap-4">
                    <div id="tr__image" className="w-1/6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full object-cover rounded-lg"
                      />
                    </div>
                    <div
                      id="tr_details"
                      className="flex flex-col justify-center flex-grow"
                    >
                      <div id="tr__name" className="font-semibold">
                        {item.name}
                      </div>
                      <div id="tr__price">
                        {"Rp." + item.price * item.quantity}
                      </div>
                    </div>
                    <div
                      id="tr__quantity"
                      className="flex justify-between items-center"
                    >
                      <button
                        onClick={() => dispatch(lowerItemQuantity(item))}
                        className="p-2 text-white w-8 bg-[#0079FF] rounded-l"
                      >
                        -
                      </button>
                      <div className="p-2 bg-gray-200 w-8 text-center">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => dispatch(increaseItemQuantity(item))}
                        className="p-2 text-white w-8 bg-[#0079FF] rounded-r"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col gap-4 justify-between bg-white border-t border-t-gray-400 border-spacing-48 border-dashed rounded-b-3xl">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold">Total:</h1>
              <p className="text-xl font-bold">{"Rp." + totalPrice}</p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="paid_amount" className="text-xl font-bold">
                Paid Amount
              </label>
              <input
                id="paid_amount"
                type="number"
                placeholder="100000"
                onChange={(e) => setPaid(e.target.value)}
                className="px-4 py-2 w-full rounded placeholder:italic border border-gray-400"
              />
            </div>
            {totalProducts !== 0 && change >= 0 ? (
              <div className="flex justify-between">
                <h1 className="text-xl font-bold">Change</h1>
                <p className="text-xl font-bold">
                  {"Rp." + (paid - totalPrice)}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          <Button
            text="Checkout"
            variant="primary"
            onClick={() => clickHandler()}
            className="flex w-full font-semibold"
          />
        </div>
      </div>
    </>
  );
}

export default Cart;
