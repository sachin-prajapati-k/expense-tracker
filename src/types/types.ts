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


export type EFilterTypes={
      category:string,
        dateFrom:string,
        dateTo:string,
        minAmount:number |null,
        maxAmount:number | null,
        searchTerm:string
}