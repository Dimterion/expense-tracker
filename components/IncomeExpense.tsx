import { addCommas } from "@/lib/utils";
import getIncomeExpense from "@/app/actions/getIncomeExpense";

const IncomeExpense = async () => {
  const { income, expense } = await getIncomeExpense();

  return (
    <section className="incomeExpense-section">
      <article className="incomeExpense-article">
        <h4 className="incomeExpense-h4">Income</h4>
        <p className="incomeExpense-paragraph green-color">
          ${addCommas(Number(income?.toFixed(2)))}
        </p>
      </article>
      <article className="incomeExpense-article">
        <h4 className="incomeExpense-h4">Expense</h4>
        <p className="incomeExpense-paragraph red-color">
          ${addCommas(Number(expense?.toFixed(2)))}
        </p>
      </article>
    </section>
  );
};

export default IncomeExpense;
