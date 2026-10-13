import axios from "axios";
import { Payment, PaymentSearchResponse } from "../types/Payment";
import { API_URL } from "../constants";

type PaymentQuery = {
  search?: string;
  page?: number;
  pageSize?: number;
  currency?: string;
};

export class InvalidResponseError extends Error {
  constructor() {
    super("The payments response has an unexpected shape.");
    this.name = "InvalidResponseError";
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isPayment = (value: unknown): value is Payment =>
  isRecord(value) &&
  typeof value.id === "string" &&
  typeof value.amount === "number" &&
  typeof value.currency === "string" &&
  typeof value.customerName === "string" &&
  typeof value.status === "string" &&
  typeof value.date === "string";

export const isPaymentSearchResponse = (
  value: unknown,
): value is PaymentSearchResponse =>
  isRecord(value) &&
  Array.isArray(value.payments) &&
  value.payments.every(isPayment) &&
  typeof value.total === "number" &&
  typeof value.page === "number" &&
  typeof value.pageSize === "number";

const fetchPayments = async (
  query?: PaymentQuery,
): Promise<PaymentSearchResponse> => {
  const response = await axios<unknown>(API_URL, {
    params: query,
  });

  if (!isPaymentSearchResponse(response.data)) {
    throw new InvalidResponseError();
  }

  return response.data;
};

export { fetchPayments };
