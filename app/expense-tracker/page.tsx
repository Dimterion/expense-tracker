"use client";

import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { addCommas } from "@/lib/utils";

type Transaction = {
  id: string;
  text: string;
  amount: number;
  sign: string;
  className: string;
  deleteConfirmation: boolean;
};

const ExpenseTracker = () => {
  const [balance, setBalance] = useState<number>(() => {
    try {
      const savedBalance = localStorage.getItem("balance");

      return savedBalance ? JSON.parse(savedBalance) : 0;
    } catch (error) {
      console.error("Local storage error:", error);

      return 0;
    }
  });
  const [income, setIncome] = useState<number>(() => {
    try {
      const savedIncome = localStorage.getItem("income");

      return savedIncome ? JSON.parse(savedIncome) : 0;
    } catch (error) {
      console.error("Local storage error:", error);

      return 0;
    }
  });
  const [expense, setExpense] = useState<number>(() => {
    try {
      const savedExpense = localStorage.getItem("expense");

      return savedExpense ? JSON.parse(savedExpense) : 0;
    } catch (error) {
      console.error("Local storage error:", error);

      return 0;
    }
  });
  const [transaction, setTransaction] = useState({
    text: "",
    amount: "0",
  });
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const savedTransactions = localStorage.getItem("transactions");

      return savedTransactions ? JSON.parse(savedTransactions) : [];
    } catch (error) {
      console.error("Local storage error:", error);

      return [];
    }
  });
  const [expandSection, setExpandSection] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("balance", JSON.stringify(balance));
    } catch (error) {
      console.error("Local storage error:", error);
    }
  }, [balance]);

  useEffect(() => {
    try {
      localStorage.setItem("income", JSON.stringify(income));
    } catch (error) {
      console.error("Local storage error:", error);
    }
  }, [income]);

  useEffect(() => {
    try {
      localStorage.setItem("expense", JSON.stringify(expense));
    } catch (error) {
      console.error("Local storage error:", error);
    }
  }, [expense]);

  useEffect(() => {
    try {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    } catch (error) {
      console.error("Local storage error:", error);
    }
  }, [transactions]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const id = uuidv4();
    const text = transaction.text.trim();
    const amount = parseFloat(transaction.amount);
    const className = amount < 0 ? "red-color" : "green-color";
    const sign = amount < 0 ? "-" : "+";

    if (!text || text === "" || isNaN(amount) || amount === 0) {
      toast.error("Text or amount is missing.");

      return;
    }

    if (amount > 0) {
      setIncome((prevIncome: number) => prevIncome + amount);
    } else {
      setExpense((prevExpense: number) => prevExpense + Math.abs(amount));
    }

    setBalance((prevBalance: number) => prevBalance + amount);
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      { id, text, amount, sign, className, deleteConfirmation: false },
    ]);
    setTransaction({ text: "", amount: "0" });
    setExpandSection(!expandSection);

    toast.success(`Transaction of ${amount && amount}$ added.`);
  }

  function toggleDeleteConfirmation(transactionId: string) {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === transactionId
          ? {
              ...transaction,
              deleteConfirmation: !transaction.deleteConfirmation,
            }
          : transaction
      )
    );
  }

  function deleteTransaction(transaction: Transaction) {
    setTransactions((prevTransactions) =>
      prevTransactions.filter(
        (prevTransaction) => prevTransaction.id !== transaction.id
      )
    );
    setBalance((prevBalance: number) => prevBalance - transaction.amount);

    if (transaction.amount > 0) {
      setIncome((prevIncome: number) => prevIncome - transaction.amount);
    } else {
      setExpense(
        (prevExpense: number) => prevExpense - Math.abs(transaction.amount)
      );
    }

    toast.success("Transaction deleted.");
  }

  return (
    <main className="homePage-main">
      <h2 className="homePage-h2">Welcome!</h2>
      <section>
        <h3 className="balance-h3">Your Balance:</h3>
        <h2 className="balance-h2">
          {isClient ? `$${addCommas(Number(balance?.toFixed(2) ?? 0))}` : "..."}
        </h2>
      </section>
      <section className="incomeExpense-section">
        <article className="incomeExpense-article">
          <h4 className="incomeExpense-h4">Income</h4>
          <p className="incomeExpense-paragraph green-color">
            {isClient ? `$${addCommas(Number(income?.toFixed(2)))}` : "..."}
          </p>
        </article>
        <article className="incomeExpense-article">
          <h4 className="incomeExpense-h4">Expense</h4>
          <p className="incomeExpense-paragraph red-color">
            {isClient ? `$${addCommas(Number(expense?.toFixed(2)))}` : "..."}
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
      <>
        <h3 className="transactionList-h3">History</h3>
        {isClient
          ? transactions?.length === 0 && <p>No transactions yet.</p>
          : ""}
        <ul className="transactionList-ul">
          {isClient
            ? transactions &&
              transactions.map((transaction) => (
                <li key={transaction.id} className="transactionItem-li">
                  {!transaction.deleteConfirmation ? (
                    <>
                      <p className="transactionItem-paragraph">
                        <span className="transactionText">
                          {transaction.text}
                        </span>
                        <span
                          className={`transactionAmount ${transaction.className}`}
                        >
                          {transaction.sign}$
                          {addCommas(Math.abs(transaction.amount))}
                        </span>
                      </p>
                      <button
                        className="transactionItem-btn primary-bg"
                        onClick={() => toggleDeleteConfirmation(transaction.id)}
                        aria-label="Delete transaction"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="transactionText red-color">
                        Delete this transaction?
                      </p>
                      <article className="transactionItem-article">
                        <button
                          className="transactionItem-btn green-bg"
                          onClick={() => deleteTransaction(transaction)}
                          aria-label="Confirm transaction deletion"
                        >
                          <FaCheck />
                        </button>
                        <button
                          className="transactionItem-btn red-bg"
                          onClick={() =>
                            toggleDeleteConfirmation(transaction.id)
                          }
                          aria-label="Cancel transaction deletion"
                        >
                          <FaTimes />
                        </button>
                      </article>
                    </>
                  )}
                </li>
              ))
            : "Loading..."}
        </ul>
      </>
    </main>
  );
};

export default ExpenseTracker;
