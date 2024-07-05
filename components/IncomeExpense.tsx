import getIncomeExpense from "@/app/actions/getIncomeExpense";
import { addCommas } from "@/lib/utils";

const IncomeExpense = async () => {
  const { income, expense } = await getIncomeExpense();

  return (
    <section className="incomeExpense-section">
      <article>
        <h4>Income</h4>
        <p>${addCommas(Number(income?.toFixed(2)))}</p>
      </article>
      <article>
        <h4>Expense</h4>
        <p>${addCommas(Number(expense?.toFixed(2)))}</p>
      </article>
    </section>
  );
};

export default IncomeExpense;
