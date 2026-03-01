import { useState } from "react";
import {
  EFilterTypes,
  EgetFilterSummaryType,
  ENewExpense,
} from "../types/types";

type ExpenseCardProps = {
  expenses: ENewExpense[];
  removeExpense: (id: number) => void;
  totalAmount: number;
  category: string[];
  getExpenseByCategory: (category: string) => ENewExpense[];
  filters: EFilterTypes;
  updateFilter: (key: keyof EFilterTypes, value: any) => void;
  clearFilter: () => void;
  getFilterSummary: EgetFilterSummaryType;
};

export default function ExpenseCard({
  expenses,
  removeExpense,
  totalAmount,
  category,
  getExpenseByCategory,
  filters,
  clearFilter,
  getFilterSummary,
  updateFilter,
}: ExpenseCardProps) {
  const [filterCategory, setFilterCategory] = useState("All");
  const filteredTotal = expenses.reduce(
    (total, expense) => total + parseFloat(expense.amount ?? ""),
    0,
  );

  return (
    <>
      <div
        className={`${!expenses.length ? "bg-[#ff5733]" : "bg-white"} p-6 rounded-xl`}
      >
        {expenses.length > 0 ? (
          <div>
            <header className="italic flex gap-4 flex-wrap">
              <div>
                <span>
                  Showing {getFilterSummary.totalResult} records from{" "}
                  {expenses.length}
                </span>
                <br />
                <span>Total Expense: ₹{filteredTotal.toFixed(2)}</span>
                <span>
                  <select
                    className=" px-4 py-2 mx-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    required
                  >
                    <option value="All">Choose a Category</option>
                    {category.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
              <div>
                <span>
                  <input
                    className="border p-1 rounded-lg mx-2"
                    value={filters.searchTerm}
                    type="text"
                    placeholder="type for search"
                    onChange={(e) => updateFilter("searchTerm", e.target.value)}
                  />
                </span>
                <span>
                  <input
                    className="border p-1 rounded-lg mx-2"
                    value={Number(filters.minAmount)}
                    type="number"
                    placeholder="min value"
                    onChange={(e) => updateFilter("minAmount", e.target.value)}
                  />
                </span>
              </div>
              <div>
                <span>
                  <input
                    className="border p-1 rounded-lg mx-2"
                    value={Number(filters.maxAmount)}
                    type="number"
                    placeholder="max value"
                    onChange={(e) => updateFilter("maxAmount", e.target.value)}
                  />
                </span>
                <span>
                  <input
                    className="border p-1 rounded-lg mx-2"
                    value={filters.dateFrom}
                    type="date"
                    placeholder="from Date"
                    onChange={(e) => updateFilter("dateFrom", e.target.value)}
                  />
                </span>{" "}
              </div>
              <div>
                <span>
                  <input
                    className="border p-1 rounded-lg mx-2"
                    value={filters.dateTo}
                    type="date"
                    placeholder="to Date"
                    onChange={(e) => updateFilter("dateTo", e.target.value)}
                  />
                </span>
                <span>
                  {getFilterSummary.hasActiveFilter && (
                    <button
                      type="submit"
                      onClick={clearFilter}
                      className="bg-blue-500 border rounded-xl text-white p-2"
                    >
                      clear filters {getFilterSummary.activeCount}
                    </button>
                  )}
                </span>
              </div>
            </header>
            {expenses.map((expense: ENewExpense, index: number) => (
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
