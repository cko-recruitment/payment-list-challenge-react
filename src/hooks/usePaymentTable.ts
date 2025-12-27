import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../constants/index";

// Custom hook for managing payment table data
export const usePaymentTable = (apiBaseUrl = API_URL) => {
  // state management
  const [payments, setPayments] = useState([]);
  const [page] = useState(1);
  const [pageSize] = useState(5);

  const query = `page=${page}&pageSize=${pageSize}`;

  // API call to fetch payments
  const fetchPayments = useCallback(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}?${query}`);
      const data = await response.json();
      setPayments(data.payments || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  }, [apiBaseUrl]);

  // Auto-fetch when dependencies change
  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return { payments };
};