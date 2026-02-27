import { useState } from "react";
import { ENewExpense } from "../types/types";

type ExpenseCardProps = {
  expenses: ENewExpense[];
  removeExpense: (id: number) => void;
  totalAmount: number;
  category: string[];
  getExpenseByCategory: (category: string) => ENewExpense[];
};

export default function ExpenseCard({
  expenses,
  removeExpense,
  totalAmount,
  category,
  getExpenseByCategory,
}: ExpenseCardProps) {
  const [filterCategory, setFilterCategory] = useState("All");
  const categories: string[] = [
    "All",
    "Other",
    "Food",
    "Electronics",
    "Recharges",
    "Rent",
    "Office",
    "Transportation",
  ];
  const filteredExpenses = getExpenseByCategory(filterCategory);
  const filteredTotal = filteredExpenses.reduce(
    (total, expense) => total + (expense.amount ?? 0),
    0,
  );

  return (
    <>
      <div
        className={`${!expenses.length ? "bg-[#ff5733]" : "bg-white"} p-6 rounded-xl`}
      >
        {expenses.length > 0 ? (
          <div>
            <header className="italic flex gap-3">
              <span>Total Expense: ₹{filteredTotal.toFixed(2)}</span>
              <span>
                Filter by Expense:
                <select
                  className=" px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={category}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  required
                >
                  <option value="All">Choose a Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </span>
            </header>
            {filteredExpenses.map((expense: ENewExpense, index: number) => (
              <div
                key={expense.id}
                className="my-1 bg-[#fff0cc] py-0 rounded-2xl"
              >
                <h5 className="text-2xl flex justify-between px-2 text-right rounded-xl bg-[#3cf784] font-bold">
                  {" "}
                  <button
                    className="bg-[#ff0000dd] rounded-lg p-1 text-sm"
                    onClick={() => removeExpense(expense.id)}
                  >
                    Delete
                  </button>
                  <span className="px-2 text-blue-800">
                    Category: {expense.category}
                  </span>
                </h5>
                <div className=" px-3 py-2">
                  <p className="text flex gap-2 my-2 justify-between">
                    <span className=" bg-[#dddddd] rounded-xl p-2 w-100">
                      {" "}
                      {expense.description}
                    </span>
                    <span className="right-20 rounded-xl text-red-500 font-bold bg-[#a0ffcb] p-2">
                      ₹{expense.amount}
                    </span>
                  </p>
                  <p className="text-sm">{expense.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="italic text-white text-2xl font-bold">
            No Expense, Add new Expense
          </p>
        )}
      </div>
    </>
  );
}
