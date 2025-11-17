import { enGB } from "date-fns/locale";
import type { Locale } from "date-fns";

export const API_URL = "/api/payments";
export const HTTP_REQUEST_TIMEOUT_MS = 10_000;

export const DEFAULT_LOCALE: {
  code: string;
  dateFns: Locale;
} = {
  code: "en-GB",
  dateFns: enGB,
};

export const DEFAULT_TIME_ZONE = "Europe/London";

export const DATE_FORMAT = "dd/MM/yyyy";
export const TIME_FORMAT = "HH:mm:ss";

export const PAYMENT_STATUS = {
  COMPLETED: "completed",
  PENDING: "pending",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const;

export type PaymentStatus =
  (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const PAYMENT_COLUMN_KEYS = {
  ID: "id",
  DATE: "date",
  AMOUNT: "amount",
  CUSTOMER_NAME: "customerName",
  CURRENCY: "currency",
  STATUS: "status",
} as const;

export type PaymentColumnKey =
  (typeof PAYMENT_COLUMN_KEYS)[keyof typeof PAYMENT_COLUMN_KEYS];
