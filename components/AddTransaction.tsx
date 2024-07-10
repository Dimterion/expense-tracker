"use client";

import { useRef } from "react";
import addTransaction from "@/app/actions/addTransaction";
import { toast } from "react-toastify";

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (formData: FormData) => {
    const { data, error } = await addTransaction(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Transaction added.");
      formRef.current?.reset();
    }
  };

  return (
    <section className="addTransaction-section">
      <h3>Add transaction</h3>
      <form className="addTransaction-form" ref={formRef} action={clientAction}>
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
          />
        </article>
        <article className="addTransaction-article">
          <label className="addTransaction-label" htmlFor="amount">
            Amount <br /> (negative - expense, positive - income)
          </label>
          <input
            className="addTransaction-input"
            type="number"
            name="amount"
            id="amount"
            placeholder="Enter amount"
            min={-1000000}
            max={1000000}
            step="0.01"
          />
        </article>
        <button className="addTransaction-btn" aria-label="Add transaction">
          Add transaction
        </button>
      </form>
    </section>
  );
};

export default AddTransaction;
