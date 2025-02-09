"use client";

import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { addCommas } from "@/lib/utils";
import { Transaction } from "@/types/transaction";
import deleteTransaction from "@/app/actions/deleteTransaction";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const className = transaction.amount < 0 ? "red-color" : "green-color";
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
              {sign}$
              {addCommas(Math.abs(Number(transaction.amount.toFixed(2))))}
            </span>
          </p>
          <button
            className="transactionItem-btn primary-bg"
            onClick={() => setDeleteConfirmation(!deleteConfirmation)}
            aria-label="Delete transaction"
          >
            <FaTimes />
          </button>
        </>
      ) : (
        <>
          <p className="transactionText red-color">Delete this transaction?</p>
          <article className="transactionItem-article">
            <button
              className="transactionItem-btn green-bg"
              onClick={() => handleDeleteTransaction(transaction.id)}
              aria-label="Confirm transaction deletion"
            >
              <FaCheck />
            </button>
            <button
              className="transactionItem-btn red-bg"
              onClick={() => setDeleteConfirmation(!deleteConfirmation)}
              aria-label="Cancel transaction deletion"
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
