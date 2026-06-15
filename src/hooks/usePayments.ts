import axios from "axios";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { API_URL } from "../constants/index";
import { getPaymentsError } from "../helpers/getPaymentsError";
import type { Filters, PaginationType } from "../types/filters";

const fetchPayments = async (filters: Filters, pagination: PaginationType) => {
  const { data } = await axios.get(API_URL, { params: { ...pagination, ...filters } });
  return data;
}

export const usePayments = () => {
  const [draftFilters, setDraftFilters] = useState<Filters>({ search: '', currency: '' });
  const [appliedFilters, setAppliedFilters] = useState<Filters>({ search: '', currency: '' });
  const [pagination, setPagination] = useState<PaginationType>({ page: 1, pageSize: 5 });

  const { data, error: queryError, isLoading, isFetching } = 
    useQuery({ queryKey: ['payments', appliedFilters, pagination], queryFn: () => fetchPayments(appliedFilters, pagination), placeholderData: keepPreviousData });


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedFilters({ ...draftFilters });
    setPagination((prev) => ({ ...prev, page: 1 }));
  }

  const handleClear = () => {
    setDraftFilters({ search: '', currency: '' });
    setAppliedFilters({ search: '', currency: '' });
    setPagination((prev) => ({ ...prev, page: 1 }));
  }


  const errorMessage = getPaymentsError(queryError, data);

  return {
    draftFilters,
    setDraftFilters,
    pagination,
    setPagination,
    data,
    errorMessage,
    isLoading,
    isFetching,
    handleSearch,
    handleClear,
  };
}
