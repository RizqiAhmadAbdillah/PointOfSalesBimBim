import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import CloseSvg from "../assets/CloseSvg";
import SortDescSvg from "../assets/SortDescSvg";
import SortAscSvg from "../assets/SortAscSvg";

function Transactions() {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const options = ["Newest", "Charged Amount", "Paid Amount", "Change Amount"];
  const [sortBy, setSortBy] = useState(options[0]);
  const [keyword, setKeyword] = useState("");
  const [isDescending, setIsDescending] = useState(true);

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

  const [transaction, setTransaction] = useState({});
  const [transaction_detail, setTransaction_detail] = useState([]);
  const getTransactionDetail = async () => {
    await axios
      .get(
        `http://localhost:3000/transaction_details?transactionId=${transaction.id}&_expand=product`
      )
      .then((response) => setTransaction_detail(response.data))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    getTransactions();
    getTransactionDetail();
  }, [sortBy, keyword, isDescending, isDetailOpen, transaction]);
  return (
    <>
      <div
        className={`${
          isDetailOpen ? "w-2/3" : "w-full"
        } max-h-[calc(100vh-32px)] ms-32 flex flex-col gap-4 relative`}
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
        <main className="bg-white rounded-xl p-4 h-full overflow-x-hidden">
          <table className="table-auto capitalize w-full">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">charged amount</th>
                <th className="p-2">paid amount</th>
                <th className="p-2">change amount</th>
                <th className="p-2">detail</th>
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
                        setTransaction(transaction);
                        setIsDetailOpen(true);
                      }}
                      className="px-2 py-1 text-sm font-semibold"
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
          <aside className="flex flex-col gap-2 mt-4 p-2">
            <h2 className="font-semibold">{`Charged Amount: Rp.${transaction.charged_amount}`}</h2>
            <h2 className="font-semibold">{`Paid Amount: Rp.${transaction.paid_amount}`}</h2>
            <h2 className="font-semibold">{`Change Amount: Rp.${transaction.change_amount}`}</h2>
            <ul>Products:</ul>
            {transaction_detail.map((td) => (
              <li
                key={td.id}
                className="list-none flex justify-between py-2 gap-4 border-b border-b-gray-200"
              >
                <div
                  id="tr__wrapper"
                  className="flex justify-between items-center gap-4 w-full"
                >
                  <div className="flex flex-grow justify-between gap-4">
                    <div id="tr__image" className="w-1/6">
                      <img
                        src={td.product.image}
                        alt={td.product.name}
                        className="h-full object-cover rounded-lg"
                      />
                    </div>
                    <div
                      id="tr_details"
                      className="flex flex-col justify-center flex-grow"
                    >
                      <div id="tr__name" className="font-semibold">
                        {td.product.name}
                      </div>
                      <div id="tr__price">
                        <p>
                          {`Rp.${td.product.price} x ${td.quantity} = `}
                          <span className="font-semibold">{`Rp.${
                            td.product.price * td.quantity
                          }`}</span>
                        </p>
                      </div>
                    </div>
                    <div
                      id="tr__quantity"
                      className="flex justify-between items-center"
                    >
                      {td.product.quantity}
                    </div>
                  </div>
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
