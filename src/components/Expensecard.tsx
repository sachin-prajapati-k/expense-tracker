import { ENewExpense } from "../types/types";

export default function ExpenseCard(expenseList: ENewExpense[]) {
  return (
    <>
      <div>
        {expenseList.length > 0 ? (
          <div>
            <header className="italic">
              Total Expense: {expenseList.length}
            </header>
            {expenseList.map((expense: ENewExpense) => (
              <div key={expense.id}>
                <h5>{expense.category}</h5>
                <p>{expense.description}</p>
                <p className="text-blue-500">{expense.amount}</p>
                <p className="text-lg">{expense.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="italic text-red-500">No Expense, Add new Expense</p>
        )}
      </div>
    </>
  );
}
