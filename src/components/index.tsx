import React from "react";

type ExpenseCardProps = {
  title: string;
  amount: number;
  date: string;
  category: string;
};

const ExpenseCard = ({ title, amount, date, category }: ExpenseCardProps) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-2xl font-bold text-green-600 mb-2">{"\u20B9"} {amount}</p>
      <span className="inline-block bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full mb-2">
        {category}
      </span>
      <p className="text-gray-500 text-sm">{date}</p>
    </div>
  );
};

export default ExpenseCard;
