"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { addCommas } from "@/lib/utils";

const ExpenseTracker = () => {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transaction, setTransaction] = useState({
    text: "",
    amount: "0",
  });
  const [expandSection, setExpandSection] = useState(false);

  function handleChange(e: { target: { name: any; value: any; }; }) {
    const { name, value } = e.target;

    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  }

  function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();

    const amount = parseFloat(transaction.amount);

    if (amount > 0) {
      setIncome((prevIncome) => prevIncome + amount);
    } else {
      setExpense((prevExpense) => prevExpense + Math.abs(amount));
    }

    setBalance((prevBalance) => prevBalance + amount);
    setTransaction({ amount: "0", text: "" });
  }

  return (
    <main className="homePage-main">
      <h2 className="homePage-h2">Welcome!</h2>
      <section>
        <h3 className="balance-h3">Your Balance:</h3>
        <h2 className="balance-h2">
          ${addCommas(Number(balance?.toFixed(2) ?? 0))}
        </h2>
      </section>
      <section className="incomeExpense-section">
        <article className="incomeExpense-article">
          <h4 className="incomeExpense-h4">Income</h4>
          <p className="incomeExpense-paragraph green-color">
            ${addCommas(Number(income?.toFixed(2)))}
          </p>
        </article>
        <article className="incomeExpense-article">
          <h4 className="incomeExpense-h4">Expense</h4>
          <p className="incomeExpense-paragraph red-color">
            ${addCommas(Number(expense?.toFixed(2)))}
          </p>
        </article>
      </section>
      {!expandSection ? (
        <button
          aria-label="Open Add Transaction section"
          className={`addTransaction-btn ${!expandSection && "btnAnimation"}`}
          onClick={() => setExpandSection(!expandSection)}
        >
          Add transaction
        </button>
      ) : (
        <section className="addTransaction-section">
          <button
            aria-label="Close Add Transaction section"
            className="addTransaction-btnClose"
            onClick={() => setExpandSection(!expandSection)}
          >
            <FaTimes />
          </button>
          <form className="addTransaction-form" onSubmit={handleSubmit}>
            <article className="addTransaction-article">
              <label className="addTransaction-label" htmlFor="text">
                Text
              </label>
              <input
                className="addTransaction-input"
                type="text"
                id="text"
                name="text"
                placeholder="Enter text"
                maxLength={25}
                value={transaction.text}
                onChange={handleChange}
              />
            </article>
            <article className="addTransaction-article">
              <label className="addTransaction-label" htmlFor="amount">
                Amount*
              </label>
              <input
                className="addTransaction-input"
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter amount"
                min={-9999999}
                max={9999999}
                step="0.01"
                value={transaction.amount}
                onChange={handleChange}
              />
              <span className="subText">
                *negative - expense; positive - income
              </span>
            </article>
            <button className="addTransaction-btn" aria-label="Add transaction">
              Add transaction
            </button>
          </form>
        </section>
      )}
    </main>
  );
};

export default ExpenseTracker;
