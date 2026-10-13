import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
} from "vitest";
import { server } from "./mocks/node";
import App from "./App";
import { I18N } from "./constants/i18n";
import { format } from 'date-fns';

export const waitForErrorMessage = async (expectedMessage: string, timeout = 10000) => {
  try {
    await waitFor(() => {
      expect(screen.getByText(expectedMessage)).toBeInTheDocument();
    }, { timeout });
  } catch (error) {
    const errorElements = screen.queryAllByText(/error|not found|server/i);
    const errorTexts = errorElements.map(el => el.textContent).filter(Boolean);
    
    throw new Error(
      `Expected error message "${expectedMessage}" not found. ` +
      `Available error-related text: ${errorTexts.join(', ') || 'None found'}`
    );
  }
};

export const getTableCellsByColumnName = (columnName: string, rowIndex: number) => {
  const headers = screen.getAllByRole('columnheader');

  const columnIndex = headers.findIndex((header) =>
    (header?.textContent || '').includes(columnName),
  );

  if (columnIndex === -1) {
    throw new Error(`Column name not found`);
  }

  const rows = screen.getAllByRole('row').slice(1);

  if (rowIndex !== null) {
    const cells = rows[rowIndex]?.querySelectorAll('td');
    return cells?.[columnIndex];
  } else {
    throw new Error(`Row not found`);
  }
};

export const formattedDate = (date: string) => {
  return format(new Date(date), "dd/MM/yyyy, HH:mm:ss")
};

export const getSearchInput = () => {
  try {
    return screen.getByPlaceholderText(I18N.SEARCH_PLACEHOLDER);
  } catch {
    return screen.getByRole("searchbox", { name: I18N.SEARCH_LABEL });
  }
};

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("App - Step 1: Basic Payment List", () => {
  test("should fetch and display payments in a table with page=1 and pageSize=5", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getAllByRole("cell").length).toBeGreaterThan(0);
    });

    expect(screen.getByText(I18N.TABLE_HEADER_PAYMENT_ID)).toBeInTheDocument();
    expect(screen.getByText(I18N.TABLE_HEADER_DATE)).toBeInTheDocument();
    expect(screen.getByText(I18N.TABLE_HEADER_AMOUNT)).toBeInTheDocument();
    expect(screen.getByText(I18N.TABLE_HEADER_CUSTOMER)).toBeInTheDocument();
    expect(screen.getByText(I18N.TABLE_HEADER_CURRENCY)).toBeInTheDocument();
    expect(screen.getByText(I18N.TABLE_HEADER_STATUS)).toBeInTheDocument();

    const tableRows = screen.getAllByRole("row");
    expect(tableRows).toHaveLength(6);
  });
});

describe("App - Step 2: Search by Payment ID", () => {
  test("should have a search input for payment ID", () => {
    render(<App />);

    const searchInput = getSearchInput();
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("placeholder", I18N.SEARCH_PLACEHOLDER);
  });

  test("should search for payments by payment ID", async () => {
    render(<App />);

    const searchInput = getSearchInput();
    const searchButton = screen.getByRole("button", { name: I18N.SEARCH_BUTTON });

    fireEvent.change(searchInput, { target: { value: "pay_134_1" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText("pay_134_1")).toBeInTheDocument();
    });
  });
});

describe("App - Step 3: Clear Filters", () => {
  test("should clear all filters when clear button is clicked", async () => {
    render(<App />);

    const searchInput = getSearchInput();
    const searchButton = screen.getByRole("button", { name: I18N.SEARCH_BUTTON });

    fireEvent.change(searchInput, { target: { value: "pay_134_1" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText("pay_134_1")).toBeInTheDocument();
    });

    const clearButton = screen.getByRole("button", { name: I18N.CLEAR_FILTERS });
    fireEvent.click(clearButton);

    expect(searchInput).toHaveValue("");
  });
});

describe("App - Step 4: Handle Payment Not Found", () => {
  test("should display error message when payment ID is not found", async () => {
    render(<App />);

    const searchInput = getSearchInput();
    const searchButton = screen.getByRole("button", { name: I18N.SEARCH_BUTTON });

    fireEvent.change(searchInput, { target: { value: "pay_404" } });
    fireEvent.click(searchButton);

    await waitForErrorMessage(I18N.PAYMENT_NOT_FOUND);
  });
});

describe("App - Step 5: Handle Server Error", () => {
  test("should display error message when API returns 500", async () => {
    render(<App />);

    const searchInput = getSearchInput();
    const searchButton = screen.getByRole("button", { name: I18N.SEARCH_BUTTON });

    fireEvent.change(searchInput, { target: { value: "pay_500" } });
    fireEvent.click(searchButton);

    await waitForErrorMessage(I18N.INTERNAL_SERVER_ERROR);
  });
});

describe("App - Step 6: Currency Filter", () => {
  test("should have a currency filter dropdown", () => {
    render(<App />);

    const currencySelect = screen.getByRole("combobox", { name: I18N.CURRENCY_FILTER_LABEL });
    expect(currencySelect).toBeInTheDocument();
  });

  test("should filter payments by currency when selected", async () => {
    render(<App />);

    const currencySelect = screen.getByRole("combobox", { name: I18N.CURRENCY_FILTER_LABEL });

    fireEvent.change(currencySelect, { target: { value: "USD" } });

    await waitFor(() => {
      const usdPayments = screen.getAllByText("USD");
      expect(usdPayments.length).toBeGreaterThan(0);
    });
  });
});

describe("App - Step 7: Combined Currency and Payment ID Filter", () => {
  test("should filter by both currency and payment ID", async () => {
    render(<App />);

    const searchInput = getSearchInput();
    const searchButton = screen.getByRole("button", { name: I18N.SEARCH_BUTTON });
    const currencySelect = screen.getByRole("combobox", { name: I18N.CURRENCY_FILTER_LABEL });

    fireEvent.change(searchInput, { target: { value: "pay_134" } });
    fireEvent.click(searchButton);

    fireEvent.change(currencySelect, { target: { value: "USD" } });

    await waitFor(() => {
      const usdPayments = screen.getAllByText("USD");
      expect(usdPayments.length).toBeGreaterThan(0);
    });
  });
});

describe("App - Step 8: Pagination", () => {
  test("should display pagination controls", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getAllByRole("cell").length).toBeGreaterThan(0);
    });

    expect(screen.getByRole("button", { name: I18N.PREVIOUS_BUTTON })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: I18N.NEXT_BUTTON })).toBeInTheDocument();
  });

  test("should disable previous button on first page", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getAllByRole("cell").length).toBeGreaterThan(0);
    });

    const previousButton = screen.getByRole("button", { name: I18N.PREVIOUS_BUTTON });
    expect(previousButton).toBeDisabled();
  });
});
