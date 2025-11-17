import { JSX } from "react";

import { I18N } from "../constants/i18n";
import { usePayments } from "../hooks/usePayments";

import {
  Container,
  Title,
  TableWrapper,
  Spinner,
  ErrorBox,
  EmptyBox,
} from "./components";
import { PaymentsTable } from "./PaymentsTable";

export const PaymentsPage = (): JSX.Element => {
  const page = 1;
  const pageSize = 5;

  const { payments, isLoading, error } = usePayments({ page, pageSize });

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>

      <TableWrapper aria-label={I18N.PAGE_TITLE}>
        {isLoading ? (
          <div className="flex justify-center items-center p-4">
            <Spinner aria-label="Loading payments" />
          </div>
        ) : error ? (
          <ErrorBox role="alert">{error}</ErrorBox>
        ) : payments.length === 0 ? (
          <EmptyBox>{I18N.NO_PAYMENTS_FOUND}</EmptyBox>
        ) : (
          <PaymentsTable rows={payments} />
        )}
      </TableWrapper>
    </Container>
  );
};
