"use client";

import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { addCommas } from "@/lib/utils";
import { Transaction } from "@/types/transaction";
import deleteTransaction from "@/app/actions/deleteTransaction";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const className = transaction.amount < 0 ? "red" : "green";
  const sign = transaction.amount < 0 ? "-" : "+";

  const handleDeleteTransaction = async (transactionId: string) => {
    const { message, error } = await deleteTransaction(transactionId);

    if (error) {
      toast.error(error);
    }

    toast.success(message);
  };

  return (
    <li className="transactionItem-li">
      {!deleteConfirmation ? (
        <>
          <p className="transactionItem-paragraph">
            <span className="transactionText">{transaction.text}</span>
            <span className={`transactionAmount ${className}`}>
              {sign}${addCommas(Math.abs(transaction.amount))}
            </span>
          </p>
          <button
            className="transactionItem-btn"
            onClick={() => setDeleteConfirmation(!deleteConfirmation)}
            aria-label="Delete transaction"
          >
            <FaTimes />
          </button>
        </>
      ) : (
        <>
          <p className="transactionItem-paragraph">Delete this transaction?</p>
          <article className="transactionItem-article">
            <button
              onClick={() => handleDeleteTransaction(transaction.id)}
              className="transactionItem-btn"
            >
              <FaCheck />
            </button>
            <button
              className="transactionItem-btn"
              onClick={() => setDeleteConfirmation(!deleteConfirmation)}
              aria-label="Delete transaction"
            >
              <FaTimes />
            </button>
          </article>
        </>
      )}
    </li>
  );
};

export default TransactionItem;
