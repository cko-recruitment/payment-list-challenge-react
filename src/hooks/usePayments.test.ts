import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  type MockedFunction,
} from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { usePayments } from "./usePayments";
import { fetchPayments } from "../api/payments";
import { I18N } from "../constants/i18n";
import type { Payment } from "../types/payment";
import { PAYMENT_STATUS } from "../constants";

vi.mock("axios", () => ({
  isAxiosError: (err: unknown): err is { response?: { status?: number } } =>
    typeof err === "object" &&
    err !== null &&
    (err as { isAxiosError?: boolean }).isAxiosError === true,
}));

vi.mock("../api/payments", () => ({
  fetchPayments: vi.fn(),
}));

const mockedFetchPayments = fetchPayments as MockedFunction<
  typeof fetchPayments
>;

describe("usePayments", () => {
  const page = 1;
  const pageSize = 5;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Returns payments on successful fetch", async () => {
    const mockPayments: Payment[] = [
      {
        id: "pay_134_2",
        customerName: "Bob Red",
        amount: 150.5,
        customerAddress: "202 Red Ave, Paris, France",
        currency: "EUR",
        status: PAYMENT_STATUS.PENDING,
        date: "2024-04-15T11:00:00Z",
        description: "Product purchase",
      },
    ];

    mockedFetchPayments.mockResolvedValue({
      payments: mockPayments,
      total: 1,
      page,
      pageSize,
    });

    const { result } = renderHook(() => usePayments({ page, pageSize }));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.payments).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockedFetchPayments).toHaveBeenCalledWith(page, pageSize);
    expect(result.current.error).toBeNull();
    expect(result.current.payments).toEqual(mockPayments);
  });

  it(`Sets ${I18N.PAYMENT_NOT_FOUND} message when API returns 404`, async () => {
    const error404 = {
      isAxiosError: true,
      response: { status: 404 },
    };

    mockedFetchPayments.mockRejectedValue(error404);

    const { result } = renderHook(() => usePayments({ page, pageSize }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.payments).toEqual([]);
    expect(result.current.error).toBe(I18N.PAYMENT_NOT_FOUND);
  });

  it(`sets ${I18N.INTERNAL_SERVER_ERROR} message when API returns 500`, async () => {
    const error500 = {
      isAxiosError: true,
      response: { status: 500 },
    };

    mockedFetchPayments.mockRejectedValue(error500);

    const { result } = renderHook(() => usePayments({ page, pageSize }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.payments).toEqual([]);
    expect(result.current.error).toBe(I18N.INTERNAL_SERVER_ERROR);
  });

  it(`Falls back to ${I18N.SOMETHING_WENT_WRONG} for non-Axios errors`, async () => {
    const genericError = new Error("Unexpected failure");

    mockedFetchPayments.mockRejectedValue(genericError);

    const { result } = renderHook(() => usePayments({ page, pageSize }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.payments).toEqual([]);
    expect(result.current.error).toBe(I18N.SOMETHING_WENT_WRONG);
  });
});
