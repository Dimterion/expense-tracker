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
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            name="text"
            placeholder="Enter text..."
          />
        </article>
        <article className="addTransaction-article">
          <label htmlFor="amount">
            Amount <br /> (negative - expense, positive - income)
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Enter amount..."
            step="0.01"
          />
        </article>
        <button>Add transaction</button>
      </form>
    </section>
  );
};

export default AddTransaction;
