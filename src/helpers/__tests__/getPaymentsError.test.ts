import { describe, expect, test } from "vitest";
import { AxiosError } from "axios";
import { getPaymentsError } from "../getPaymentsError";
import { I18N } from "../../constants/i18n";
import type { PaymentSearchResponse } from "../../types/payment";

const axiosError = (status: number) =>
  new AxiosError("failed", "ERR", undefined, undefined, {
    status,
  } as AxiosError["response"]);

const response = (count: number): PaymentSearchResponse => ({
  payments: Array.from({ length: count }, (_, i) => ({
    id: `pay_${i}`,
    amount: 100,
    currency: "USD",
    customerAddress: "1 Test St",
    customerName: "Test",
    date: "2024-04-15T11:00:00Z",
    status: "completed",
    description: "Test",
  })),
  total: count,
  page: 1,
  pageSize: 5,
});

describe("getPaymentsError", () => {
  test("maps known HTTP statuses to their messages", () => {
    expect(getPaymentsError(axiosError(404), undefined)).toBe(I18N.PAYMENT_NOT_FOUND);
    expect(getPaymentsError(axiosError(500), undefined)).toBe(I18N.INTERNAL_SERVER_ERROR);
  });

  test("falls back to a generic message for any other error", () => {
    expect(getPaymentsError(axiosError(401), undefined)).toBe(I18N.SOMETHING_WENT_WRONG);
    expect(getPaymentsError(new Error("boom"), undefined)).toBe(I18N.SOMETHING_WENT_WRONG);
  });

  test("treats an empty result set as not found", () => {
    expect(getPaymentsError(null, response(0))).toBe(I18N.PAYMENT_NOT_FOUND);
  });

  test("returns null when there is data and no error", () => {
    expect(getPaymentsError(null, response(3))).toBeNull();
  });
});
