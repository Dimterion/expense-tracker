import getTransactions from "@/app/actions/getTransactions";
import TransactionItem from "./TransactionItem";
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
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
      </ul>
    </>
  );
};

export default TransactionList;
