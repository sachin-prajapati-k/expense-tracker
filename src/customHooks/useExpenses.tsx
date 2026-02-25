import { useMemo } from "react";
import { ENewExpense } from "../types/types";
import useLocalStorage from "./useLocalStorage";

const useExpenses = () => {
  const [expenses, setExpenses] = useLocalStorage<ENewExpense[]>(
    "expenses",
    [],
  );
  const addExpenses = (expenseData: ENewExpense) => {
    const newExpense = {
      ...expenseData,
    };
    return setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
  };
  const removeExpense = (id: number) => {
    return setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id),
    );
  };
  const getTotalAmount = useMemo(() => {
    const totalExpenseAmount = expenses.reduce(
      (total, expense) => total + (expense.amount ?? 0),
      0,
    );
    return totalExpenseAmount;
  }, [expenses]);
  const getExpenseByCategory = (category: string) => {
    if (!category || category === "All") return expenses;
    return expenses.filter((expense) => expense.category === category);
  };
  return {
    expenses,
    addExpenses,
    removeExpense,
    getExpenseByCategory,
    getTotalAmount,
  };
};

export default useExpenses;
