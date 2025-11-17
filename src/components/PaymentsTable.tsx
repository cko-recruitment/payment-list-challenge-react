import React, { JSX } from "react";

import { I18N } from "../constants/i18n";
import {
  DEFAULT_LOCALE, DEFAULT_TIME_ZONE,
  PAYMENT_COLUMN_KEYS,
  type PaymentColumnKey,
  type PaymentStatus,
} from "../constants";
import type { Payment } from "../types/payment";
import { formatPaymentAmount, formatPaymentDate } from "../utils/format";

import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  StatusBadge,
  TableHeaderWrapper,
  TableHeaderRow,
  TableBodyWrapper,
} from "./components";

interface ColumnConfig {
  key: PaymentColumnKey;
  header: string;
  render: (payment: Payment) => React.ReactNode;
}

const statusLabelMap: Record<PaymentStatus, string> = {
  completed: I18N.PAYMENT_STATUS_COMPLETED,
  pending: I18N.PAYMENT_STATUS_PENDING,
  failed: I18N.PAYMENT_STATUS_FAILED,
  refunded: I18N.PAYMENT_STATUS_REFUNDED,
};

const columns: ColumnConfig[] = [
  {
    key: PAYMENT_COLUMN_KEYS.ID,
    header: I18N.TABLE_HEADER_PAYMENT_ID,
    render: (payment) => payment.id,
  },
  {
    key: PAYMENT_COLUMN_KEYS.DATE,
    header: I18N.TABLE_HEADER_DATE,
    render: (payment) =>
      formatPaymentDate(payment.date, {
        locale: DEFAULT_LOCALE.dateFns,
        timeZone: DEFAULT_TIME_ZONE,
      }),
  },
  {
    key: PAYMENT_COLUMN_KEYS.AMOUNT,
    header: I18N.TABLE_HEADER_AMOUNT,
    render: (payment) =>
      formatPaymentAmount(payment.amount, payment.currency),
  },
  {
    key: PAYMENT_COLUMN_KEYS.CUSTOMER_NAME,
    header: I18N.TABLE_HEADER_CUSTOMER,
    render: (payment) => payment.customerName || I18N.EMPTY_CUSTOMER,
  },
  {
    key: PAYMENT_COLUMN_KEYS.CURRENCY,
    header: I18N.TABLE_HEADER_CURRENCY,
    render: (payment) => payment.currency || I18N.EMPTY_CURRENCY,
  },
  {
    key: PAYMENT_COLUMN_KEYS.STATUS,
    header: I18N.TABLE_HEADER_STATUS,
    render: (payment) => (
      <StatusBadge status={payment.status}>
        {statusLabelMap[payment.status]}
      </StatusBadge>
    ),
  },
];

interface PaymentsTableProps {
  rows: Payment[];
}

export const PaymentsTable = ({ rows }: PaymentsTableProps): JSX.Element => (
  <Table>
    <TableHeaderWrapper>
      <TableHeaderRow>
        {columns.map((column) => (
          <TableHeader key={column.key} scope="col">
            {column.header}
          </TableHeader>
        ))}
      </TableHeaderRow>
    </TableHeaderWrapper>

    <TableBodyWrapper>
      {rows.map((payment) => (
        <TableRow key={payment.id}>
          {columns.map((column) => (
            <TableCell key={column.key}>{column.render(payment)}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBodyWrapper>
  </Table>
);
