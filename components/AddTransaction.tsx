"use client";

const AddTransaction = () => {
  const clientAction = async (formData: FormData) => {
    console.log(formData.get("text"), formData.get("amount"));
  };
  return (
    <>
      <h3>Add transaction</h3>
      <form action={clientAction}>
        <div>
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            name="text"
            placeholder="Enter text..."
          />
        </div>
        <div>
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
        </div>
        <button>Add transaction</button>
      </form>
    </>
  );
};

export default AddTransaction;
