import getIncomeExpense from "@/app/actions/getIncomeExpense";

const IncomeExpense = async () => {
  const { income, expense } = await getIncomeExpense();

  return (
    <div>
      <div>
        <h4>Income</h4>
        <p>${income}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p>${expense}</p>
      </div>
    </div>
  );
};

export default IncomeExpense;
