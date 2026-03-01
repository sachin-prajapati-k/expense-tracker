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
      minAmount: undefined,
      maxAmount: undefined,
      searchTerm: "",
    });
  };

  const filterdData = useMemo(() => {
    return data.filter((item) => {
      if (filters.category !== "All" && item.category !== filters.category) {
        return false;
      }
      if (filters.dateFrom && (item.date ?? "") < filters.dateFrom) {
        return false;
      }
      if (filters.minAmount && (item.amount ?? 0) < filters.minAmount) {
        return false;
      }

      if (filters.maxAmount && (item.amount ?? 0) > filters.maxAmount) {
        return false;
      }
      if (
        filters.searchTerm &&
        filters.searchTerm
          .toLowerCase()
          .includes(item.description.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [data, filters]);
  const getFilterSummary = <T extends EgetFilterSummaryType>(): T => {
    const activeFilters = Object.entries(filters).filter(([key, value]) => {
      if (key === "category") return value !== "All";
      return value !== "";
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
