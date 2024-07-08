import getIncomeExpense from "@/app/actions/getIncomeExpense";
import { addCommas } from "@/lib/utils";

const IncomeExpense = async () => {
  const { income, expense } = await getIncomeExpense();

  return (
    <section className="incomeExpense-section">
      <article className="incomeExpense-article">
        <h4>Income</h4>
        <p className="green">${addCommas(Number(income?.toFixed(2)))}</p>
      </article>
      <article className="incomeExpense-article">
        <h4>Expense</h4>
        <p className="red">${addCommas(Number(expense?.toFixed(2)))}</p>
      </article>
    </section>
  );
};

export default IncomeExpense;
