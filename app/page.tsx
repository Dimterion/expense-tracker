import { currentUser } from "@clerk/nextjs/server";
import Guest from "@/components/Guest";
import Balance from "@/components/Balance";
import IncomeExpense from "@/components/IncomeExpense";
import AddTransaction from "@/components/AddTransaction";
import TransactionList from "@/components/TransactionList";

const HomePage = async () => {
  const user = await currentUser();

  if (!user) {
    return <Guest />;
  }

  return (
    <main className="homePage-main">
      <h2 className="homePage-h2">
        Welcome{user.firstName && `, ${user.firstName}`}!
      </h2>
      <Balance />
      <IncomeExpense />
      <AddTransaction />
      <TransactionList />
    </main>
  );
};

export default HomePage;
