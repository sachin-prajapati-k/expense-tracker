import { ENewExpense } from "../types/types";

type ExpenseCardProps = {
  expenses: ENewExpense[];
  totalExpense: number | null;
};

export default function ExpenseCard({ expenses, totalExpense }: ExpenseCardProps) {
  return (
    <>
  <div
  className={`${!expenses.length ? "bg-[#ff5733]" : "bg-white"} p-6 rounded-xl`}
>
        {expenses.length > 0 ? (
          <div>
            <header className="italic">
              Total Expense: {totalExpense ?? 0}
            </header>
            {expenses.map((expense: ENewExpense) => (
              <div key={expense.id} className="my-1 p-1">
                <h5 >{expense.category}</h5>
                <p>{expense.description}</p>
                <p className="text-blue-500">{expense.amount}</p>
                <p className="text-lg">{expense.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="italic text-white text-2xl font-bold">No Expense, Add new Expense</p>
        )}
      </div>
    </>
  );
}
