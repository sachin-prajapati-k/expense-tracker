import { useMemo, useState } from "react";
import {
  EFilterTypes,
  EgetFilterSummaryType,
  ENewExpense,
} from "../types/types";

export default function useFilter(data: ENewExpense[]) {
  const [filters, setFilters] = useState<EFilterTypes>({
    category: "All",
    dateFrom: "",
    dateTo: "",
    minAmount: undefined,
    maxAmount: undefined,
    searchTerm: undefined,
  });

  const updateFilter = (key: string, value: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };
  const clearFilter = () => {
    setFilters({
      category: "All",
      dateFrom: "",
      dateTo: "",
      minAmount: "",
      maxAmount: "",
      searchTerm: "",
    });
  };

  const filterdData = useMemo(() => {
    return data.filter((item) => {
      if (filters.category !== "All" && item.category !== filters.category) {
        return false;
      }
      const itemDate = (item.date ?? "").trim();
      if (filters.dateFrom) {
        if (!itemDate || itemDate < filters.dateFrom) return false;
      }
      if (filters.dateTo) {
        if (itemDate || filters.dateTo< itemDate  ) return true;
      }
      if (
        filters.minAmount &&
        item.amount != null &&  
        !(item.amount < filters.minAmount)
      ) {
        return false;
      }

      if (
        filters.maxAmount &&
        item.amount != null &&
        !(item.amount > filters.maxAmount)
      ) {
        return false;
      }
      if (
        filters.searchTerm &&
        !item.description
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [data, filters]);
  const getFilterSummary = <T extends EgetFilterSummaryType>(): T => {
    const activeFilters = Object.entries(filters).filter(([key, value]) => {
      if (key === "category") return value !== "All";
      return value != null && value !== "";
    });
    return {
      activeCount: activeFilters.length,
      totalResult: filterdData.length,
      hasActiveFilter: activeFilters.length > 0,
    } as T;
  };
  return {
    filterdData,
    filters,
    updateFilter,
    clearFilter,
    getFilterSummary,
  };
}
