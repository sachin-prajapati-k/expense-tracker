export type EDescription = {
  name: string;
};

export type ENewExpense = {
  id: number;
  amount: string | null;
  category: string;
  description: string;
  date: string | undefined;
};

export type EFilterTypes = {
  category: string;
  dateFrom: string;
  dateTo: string;
  minAmount: string | undefined;
  maxAmount: string | undefined;
  searchTerm: string | undefined;
};

export type EgetFilterSummaryType = {
  activeCount: number;
  totalResult: number;
  hasActiveFilter: boolean;
};
