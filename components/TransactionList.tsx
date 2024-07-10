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
      <h3 className="transactionList-h3">History</h3>
      {transactions?.length === 0 && <p>No transactions yet.</p>}
      <ul className="transactionList-ul">
        {transactions &&
          transactions.map((transaction: Transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
      </ul>
    </>
  );
};

export default TransactionList;
