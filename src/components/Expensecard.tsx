import { ENewExpense } from "../types/types";

type ExpenseCardProps = {
  expenses: ENewExpense[];
  removeExpense: (id: number) => void;
  totalAmount: number;
};

export default function ExpenseCard({
  expenses,
  removeExpense,
  totalAmount,
}: ExpenseCardProps) {
  return (
    <>
      <div
        className={`${!expenses.length ? "bg-[#ff5733]" : "bg-white"} p-6 rounded-xl`}
      >
        {expenses.length > 0 ? (
          <div>
            <header className="italic">
              Total Expense: ₹{totalAmount.toFixed(2)}
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
