export type EDescription = {
  name: string;
};

export type ENewExpense = {
  id: number;
  amount: number | null;
  category: string;
  description: string;
  date: string | undefined;
};
