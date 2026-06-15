import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { server } from "../../mocks/node";
import { PaymentsPage } from "../PaymentsPage";
import { I18N } from "../../constants/i18n";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const renderPaymentsPage = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <PaymentsPage />
    </QueryClientProvider>
  );
};

describe("PaymentsPage - Error message", () => {
  test("does not render the error message when there is no error", async () => {
    renderPaymentsPage();

    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

describe("PaymentsPage - Currency filter", () => {
  test("includes a default 'all currencies' option", async () => {
    renderPaymentsPage();

    const currencySelect = screen.getByRole("combobox", { name: I18N.CURRENCY_FILTER_LABEL });

    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    expect(currencySelect).toHaveValue("");
    expect(screen.getByRole("option", { name: I18N.CURRENCIES_OPTION })).toBeInTheDocument();
  });

  test("only shows payments matching the selected currency", async () => {
    renderPaymentsPage();

    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    const currencySelect = screen.getByRole("combobox", { name: I18N.CURRENCY_FILTER_LABEL });
    fireEvent.change(currencySelect, { target: { value: "USD" } });

    const searchButton = screen.getByRole("button", { name: I18N.SEARCH_BUTTON });
    fireEvent.click(searchButton);

    await waitFor(() => {
      const currencyCells = screen.getAllByRole("cell").filter((cell) =>
        ["USD", "EUR", "GBP", "AUD", "CAD", "ZAR", "JPY", "CZK"].includes(cell.textContent || "")
      );
      expect(currencyCells.length).toBeGreaterThan(0);
      currencyCells.forEach((cell) => expect(cell.textContent).toBe("USD"));
    });
  });

  test("resets the currency filter back to default when Clear Filters is clicked", async () => {
    renderPaymentsPage();

    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    const currencySelect = screen.getByRole("combobox", { name: I18N.CURRENCY_FILTER_LABEL });
    fireEvent.change(currencySelect, { target: { value: "USD" } });
    expect(currencySelect).toHaveValue("USD");

    const clearButton = screen.getByRole("button", { name: I18N.CLEAR_FILTERS });
    fireEvent.click(clearButton);

    expect(currencySelect).toHaveValue("");
  });
});
