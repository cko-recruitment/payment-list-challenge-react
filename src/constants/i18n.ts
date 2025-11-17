import {PAYMENT_STATUS} from "./index.ts";

export const I18N = {
  // App title
  APP_TITLE: "Checkout.com",
  
  // Page title
  PAGE_TITLE: "All payments",
  
  // Search and filter labels
  SEARCH_PLACEHOLDER: "Enter payment ID",
  SEARCH_LABEL: "Search payments",
  CURRENCY_FILTER_LABEL: "Filter by currency",
  
  // Filter options
  CURRENCIES_OPTION: "Currencies",
  
  // Button text
  SEARCH_BUTTON: "Search",
  CLEAR_FILTERS: "Clear Filters",
  
  // Table headers
  TABLE_HEADER_PAYMENT_ID: "Payment ID",
  TABLE_HEADER_DATE: "Date",
  TABLE_HEADER_AMOUNT: "Amount",
  TABLE_HEADER_CUSTOMER: "Customer",
  TABLE_HEADER_CURRENCY: "Currency",
  TABLE_HEADER_STATUS: "Status",
  
  // Pagination
  PREVIOUS_BUTTON: "◀ Previous",
  NEXT_BUTTON: "Next ▶",
  PAGE_LABEL: "Page",

  // Payment Status
  PAYMENT_STATUS_COMPLETED: PAYMENT_STATUS.COMPLETED,
  PAYMENT_STATUS_PENDING: PAYMENT_STATUS.PENDING,
  PAYMENT_STATUS_FAILED: PAYMENT_STATUS.FAILED,
  PAYMENT_STATUS_REFUNDED: PAYMENT_STATUS.REFUNDED,

  // Messages
  NO_PAYMENTS_FOUND: "No payments found.",
  PAYMENT_NOT_FOUND: "Payment not found.",
  
  // Fallback values
  EMPTY_CUSTOMER: "—",
  EMPTY_CURRENCY: "—",

  // ERROR MESSAGES
  // HTTP / API
  INTERNAL_SERVER_ERROR: "Internal server error. Please try again later.",
  SOMETHING_WENT_WRONG: "Something went wrong!",
  API_REQUEST_FAILED: "API request failed",
  // Currency formatting
  AMOUNT_FORMAT_ERROR: "Failed to format amount",
  NON_FINITE_AMOUNT: "Received non-finite amount value",
  // Date formatting
  DATE_FORMAT_ERROR: "Failed to format date",
  INVALID_ISO_DATE: "Received invalid ISO date string",
} as const; 