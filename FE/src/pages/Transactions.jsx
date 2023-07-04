import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import CloseSvg from "../assets/CloseSvg";

function Transactions() {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const options = ["Newest", "Charged Amount", "Paid Amount", "Change Amount"];
  const [sortBy, setSortBy] = useState(options[0]);
  const [keyword, setKeyword] = useState("");

  const evaluateParams = () => {
    const baseParams = {};
    if (keyword) {
      baseParams.q = keyword;
    }
    if (sortBy) {
      switch (sortBy) {
        case "Newest": {
          baseParams._sort = "id";
          baseParams._order = "desc";
          break;
        }
        case "Charged Amount": {
          baseParams._sort = "charged_amount";
          break;
        }
        case "Paid Amount": {
          baseParams._sort = "paid_amount";
          break;
        }
        case "Change Amount": {
          baseParams._sort = "change_amount";
          break;
        }
        default:
          break;
      }
    }
    return baseParams;
  };
  const [transactions, setTransactions] = useState([]);
  const getTransactions = async () => {
    const params = evaluateParams();
    await axios
      .get("http://localhost:3000/transactions", { params })
      .then((response) => setTransactions(response.data))
      .catch((error) => console.log(error.message));
  };

  const [transactionId, setTransactionId] = useState(0);
  const [transaction_detail, setTransaction_detail] = useState([]);
  const getTransactionDetail = async () => {
    await axios
      .get(
        `http://localhost:3000/transaction_details?transactionId=${transactionId}`
      )
      .then((response) => setTransaction_detail(response.data))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    getTransactions();
    getTransactionDetail();
  }, [sortBy, keyword, isDetailOpen, transactionId, transaction_detail]);
  return (
    <>
      <div
        className={`${
          isDetailOpen ? "w-2/3" : "w-full"
        } ms-32 flex flex-col gap-4 relative`}
      >
        <div id="main__header" className="flex justify-between">
          <h1 id="header__title" className="font-bold text-2xl">
            Transactions
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
        <main className="bg-white rounded-xl p-4">
          <table className="table-auto capitalize w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>charged amount</th>
                <th>paid amount</th>
                <th>change amount</th>
                <th>detail</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className="odd:bg-gray-100 even:bg-white"
                >
                  <td className="text-center font-semibold">{++index}</td>
                  <td className="p-2">{`Rp.${transaction.charged_amount}`}</td>
                  <td className="p-2">{`Rp.${transaction.paid_amount}`}</td>
                  <td className="p-2">{`Rp.${transaction.change_amount}`}</td>
                  <td className="flex justify-center p-2">
                    <Button
                      text="Detail"
                      variant="info"
                      onClick={() => {
                        setTransactionId(transaction.id);
                        setIsDetailOpen(true);
                      }}
                      className="px-2 py-1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
      {isDetailOpen ? (
        <div className="w-1/3 mb-4 p-2 rounded-3xl bg-white relative">
          <div id="order__header" className="flex justify-center relative">
            <h1 id="order__title" className="font-bold text-2xl text-center">
              Detail
            </h1>
            <div
              onClick={() => setIsDetailOpen(false)}
              className="cursor-pointer absolute top-0 right-1 px-2 py-1 rounded bg-[#FF0060]"
            >
              <CloseSvg />
            </div>
          </div>
          <aside className="flex flex-col gap-4">
            {/* <h2>{transactions.charged_amount}</h2>
            <h2>{transactions.paid_amount}</h2>
            <h2>{transactions.change_amount}</h2> */}
            <ul>Products</ul>
            {transaction_detail.map((td) => (
              <li key={td.id} className="list-none">
                <div className="flex">
                  <h3>product id</h3>
                  <div>{td.productId}</div>
                </div>
                <div className="flex">
                  <h3>product quantity</h3>
                  <div>{td.quantity}</div>
                </div>
                <div className="flex">
                  <h3>product subtotal</h3>
                  <div>{td.subTotal}</div>
                </div>
              </li>
            ))}
          </aside>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Transactions;
