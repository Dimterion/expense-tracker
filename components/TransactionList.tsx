import getTransactions from "@/app/actions/getTransactions";
import { Transaction } from "@/types/transaction";

const TransactionList = async () => {
  const { transactions, error } = await getTransactions();

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h3>History</h3>
      <ul>
        {transactions &&
          transactions.map((transaction: Transaction) => (
            <p>{transaction.text}</p>
          ))}
      </ul>
    </>
  );
};

export default TransactionList;
