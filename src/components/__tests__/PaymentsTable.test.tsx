import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import { PaymentsTable } from "../PaymentsTable";
import { formatDate } from "../../helpers/formatDate";
import type { Payment } from "../../types/payment";

// dd/MM/yyyy, HH:mm:ss
const FORMATTED_DATE = /^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}$/;

const payments: Payment[] = [
  {
    id: "pay_1",
    amount: 100,
    currency: "USD",
    customerAddress: "1 Test St",
    customerName: "Alice",
    date: "2024-04-15T11:00:00Z",
    status: "completed",
    description: "Test",
  },
  {
    id: "pay_2",
    amount: 250,
    currency: "EUR",
    customerAddress: "2 Test St",
    customerName: "Bob",
    date: "2024-01-05T09:08:07Z",
    status: "pending",
    description: "Test",
  },
];

describe("PaymentsTable - date column", () => {
  test("renders a formatted date for every payment row", () => {
    render(<PaymentsTable
      payments={payments}
      isLoading={false} />);

    payments.forEach((payment) => {
      const cell = screen.getByText(formatDate(payment.date));
      expect(cell).toBeInTheDocument();
      expect(cell.textContent).toMatch(FORMATTED_DATE);
    });
  });

  test("never shows the raw ISO timestamp", () => {
    render(<PaymentsTable
      payments={payments}
      isLoading={false} />);

    payments.forEach((payment) => {
      expect(screen.queryByText(payment.date)).not.toBeInTheDocument();
    });
  });
});
