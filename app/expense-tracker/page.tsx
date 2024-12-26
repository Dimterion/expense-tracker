"use client";

import Link from "next/link";
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

const useLocalStorageState = <T,>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    try {
      const savedValue = localStorage.getItem(key);

      return savedValue ? JSON.parse(savedValue) : initialValue;
    } catch (error) {
      console.error(`Local storage error (${key}):`, error);

      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Local storage error (${key}):`, error);
    }
  }, [key, state]);

  return [state, setState];
};

const ExpenseTracker = () => {
  const [toggleInfo, setToggleInfo] = useState(false);
  const [balance, setBalance] = useLocalStorageState<number>("balance", 0);
  const [income, setIncome] = useLocalStorageState<number>("income", 0);
  const [expense, setExpense] = useLocalStorageState<number>("expense", 0);
  const [transaction, setTransaction] = useState({ text: "", amount: "" });
  const [transactions, setTransactions] = useLocalStorageState<Transaction[]>(
    "transactions",
    []
  );
  const [expandSection, setExpandSection] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const id = uuidv4();
      const text = transaction.text.trim();
      const amount = parseFloat(transaction.amount);
      const className = amount < 0 ? "red-color" : "green-color";
      const sign = amount < 0 ? "-" : "+";

      // Input validation
      if (!text || text === "" || isNaN(amount) || amount === 0) {
        toast.error("Text or amount is missing.");
        return;
      }
      // Updating state based on transaction type
      if (amount > 0) {
        setIncome((prevIncome) => prevIncome + amount);
      } else {
        setExpense((prevExpense) => prevExpense + Math.abs(amount));
      }

      setBalance((prevBalance) => prevBalance + amount);
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        { id, text, amount, sign, className, deleteConfirmation: false },
      ]);
      setTransaction({ text: "", amount: "" });
      setExpandSection(!expandSection);

      toast.success(`Transaction of ${amount && amount}$ added.`);
    },
    [
      transaction,
      expandSection,
      setIncome,
      setExpense,
      setBalance,
      setTransactions,
    ]
  );

  const toggleDeleteConfirmation = useCallback(
    (transactionId: string) => {
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
    },
    [setTransactions]
  );

  const deleteTransaction = useCallback(
    (transaction: Transaction) => {
      setTransactions((prevTransactions) =>
        prevTransactions.filter(
          (prevTransaction) => prevTransaction.id !== transaction.id
        )
      );
      setBalance((prevBalance) => prevBalance - transaction.amount);

      if (transaction.amount > 0) {
        setIncome((prevIncome) => prevIncome - transaction.amount);
      } else {
        setExpense((prevExpense) => prevExpense - Math.abs(transaction.amount));
      }

      toast.success("Transaction deleted.");
    },
    [setTransactions, setBalance, setIncome, setExpense]
  );

  return (
    <main className="expenseTrackerPage-main">
      <h2 className="expenseTrackerPage-h2">Welcome!</h2>
      {!toggleInfo && (
        <button className="info-btn" onClick={() => setToggleInfo(!toggleInfo)}>
          Info
        </button>
      )}
      {toggleInfo && (
        <aside className="expenseTrackerPage-aside">
          <button
            className="info-closeBtn"
            onClick={() => setToggleInfo(!toggleInfo)}
          >
            <FaTimes />
          </button>
          <p>
            This version of the app uses local storage of your browser.
            Transactions will be saved as long as you are using the same browser
            and not clearing its temporary files. You can also{" "}
            <Link href="./">sign in</Link> to save transactions under your
            account.
          </p>
        </aside>
      )}
      <section>
        <h3 className="balance-h3">Your Balance:</h3>
        <h4 className="balance-h4">
          {isClient ? `$${addCommas(Number(balance?.toFixed(2) ?? 0))}` : "..."}
        </h4>
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
              transactions
                .slice()
                .reverse()
                .map((transaction) => (
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
                          onClick={() =>
                            toggleDeleteConfirmation(transaction.id)
                          }
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
