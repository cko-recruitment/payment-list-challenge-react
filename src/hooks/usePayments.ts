import { useEffect, useState } from "react";
import { isAxiosError } from "axios";

import { fetchPayments } from "../api/payments";
import type { Payment } from "../types/payment";
import { isProd } from "../constants/env";
import { I18N } from "../constants/i18n.ts";

interface UsePaymentsParams {
  page: number;
  pageSize: number;
  search?: string;
  currency?: string;
}

interface UsePaymentsResult {
  payments: Payment[];
  isLoading: boolean;
  error: string | null;
}

export const usePayments = ({
  page,
  pageSize,
}: UsePaymentsParams): UsePaymentsResult => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPayments = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchPayments(page, pageSize);
        if (!isMounted) return;

        setPayments(data?.payments ?? []);
      } catch (err) {
        if (!isMounted) return;

        if (!isProd) {
          console.error(I18N.API_REQUEST_FAILED, err, { page, pageSize });
        }

        let errorMsg:string = I18N.SOMETHING_WENT_WRONG;

        if (isAxiosError(err)) {
          const status = err.response?.status;
          if (status === 404) {
            errorMsg = I18N.PAYMENT_NOT_FOUND;
          }
          else if (status === 500) {
            errorMsg = I18N.INTERNAL_SERVER_ERROR;
          }
        }

        setError(errorMsg);
        setPayments([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadPayments();

    return () => {
      isMounted = false;
    };
  }, [page, pageSize]);

  return { payments, isLoading, error };
};
