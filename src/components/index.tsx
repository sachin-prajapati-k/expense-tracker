import { useState } from "react";
import ExpenseCard from "./Expensecard";
import useExpenses from "../customHooks/useExpenses";
import useFilter from "../customHooks/useFilter";

export default function Expense() {
  const {
    expenses,
    addExpenses,
    removeExpense,
    getTotalAmount,
    getExpenseByCategory,
  } = useExpenses();
  const { filterdData, filters, updateFilter, clearFilter, getFilterSummary } =
    useFilter(expenses);
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number | null>(null);
  const [category, setCategory] = useState<string>();
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!description || !amount || !category) return;
    addExpenses({
      id: Date.now(),
      amount: String(amount),
      category,
      description: description.trim(),
      date: new Date().toISOString().split("T")[0],
    });

    setDescription("");
    setAmount(null);
  };
  return (
    <>
      <div className="flex  gap-6 p-6 ">
        <div className="heading ">
          <div className=" text-4xl text-black font-bold ">
            Personal Expense Tracker
          </div>
          {/* <div className=" text-2xl my-4 font-bold bg-blue-100 text-green-600 rounded-xl"> */}
          <form
            className=" mx-auto p-6 bg-white rounded-xl shadow-xl space-y-4 text-2xl"
            onSubmit={handleSubmit}
          >
            <legend>Your Expenses</legend>
            <div className=" ">
              <label className="block text-md font-medium text-start">
                Description
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell about your expenses"
                required
              />
            </div>
            <div>
              <label className="block text-md text-start font-medium">
                Amount
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                type="number"
                value={Number(amount)}
                onChange={(e) =>
                  setAmount(e.target.value ? parseFloat(e.target.value) : null)
                }
                placeholder="Enter the Expense Amount"
                min={0}
                step={0.01}
                required
              />
            </div>
            <div>
              <label className="block text-md text-start font-medium">
                Choose Category
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={category || ""}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value={"Add Expense"}
              className="bg-blue-500 w-1/2 cursor-pointer rounded-2xl py-1 text-2xl"
            />
          </form>
        </div>
        <div className="w-1/2">
          <ExpenseCard
            expenses={filterdData}
            removeExpense={removeExpense}
            totalAmount={getTotalAmount}
            category={categories}
            getExpenseByCategory={getExpenseByCategory}
            filters={filters}
            updateFilter={updateFilter}
            clearFilter={clearFilter}
            getFilterSummary={getFilterSummary()}
          />
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
