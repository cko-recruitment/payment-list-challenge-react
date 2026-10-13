import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { I18N } from "../constants/i18n";
import { Container, Title } from "./components";

import Filters from "./filters/Filters";
import PaymentTable from "./payment-table/PaymentTable";
import { fetchPayments } from "../service/payment-service";
import ErrorMessage from "./error-message/ErrorMessage";
import { ErrorBoundary } from "react-error-boundary";

const PAGE_SIZE = 5;

export const PaymentsPage = () => {
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [appliedCurrency, setAppliedCurrency] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, isFetching, isPlaceholderData, error } = useQuery({
    queryKey: ["payments", { currentPage, appliedSearch, appliedCurrency }],
    queryFn: () =>
      fetchPayments({
        page: currentPage,
        pageSize: PAGE_SIZE,
        search: appliedSearch,
        currency: appliedCurrency,
      }),
    staleTime: 30_000,
    placeholderData: keepPreviousData,
  });

  const hasActiveFilters = appliedSearch !== "" || appliedCurrency !== "";

  const goToNextPage = () => {
    if (!isPlaceholderData) setCurrentPage((prev) => prev + 1);
  };
  const goToPreviousPage = () => {
    if (!isPlaceholderData) setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>
      <Filters
        currency={appliedCurrency}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={(search) => {
          setAppliedSearch(search);
          setCurrentPage(1);
        }}
        onCurrencyChange={(currency) => {
          setAppliedCurrency(currency);
          setCurrentPage(1);
        }}
        onClearFilters={() => {
          setAppliedSearch("");
          setAppliedCurrency("");
          setCurrentPage(1);
        }}
      />
      <div role="region" aria-label={I18N.RESULTS_LABEL} aria-busy={isFetching}>
        {error ? (
          <ErrorMessage error={error} />
        ) : (
          <ErrorBoundary
            fallback={
              <ErrorMessage error={new Error(I18N.SOMETHING_WENT_WRONG)} />
            }
            resetKeys={[appliedSearch, appliedCurrency, currentPage]}
          >
            <PaymentTable
              isLoading={isLoading}
              paymentsData={data}
              pageSize={PAGE_SIZE}
              handlePreviousPage={goToPreviousPage}
              handleNextPage={goToNextPage}
            />
          </ErrorBoundary>
        )}
      </div>
    </Container>
  );
};
