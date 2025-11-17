export const DEFAULT_DECIMALS = 2;

export const CURRENCY_CONFIG = {
  JPY: { decimals: 0 },
  USD: { decimals: 2 },
  EUR: { decimals: 2 },
  GBP: { decimals: 2 },
  AUD: { decimals: 2 },
  CAD: { decimals: 2 },
  ZAR: { decimals: 2 },
  CZK: { decimals: 2 },
} as const;

export type CurrencyCode = keyof typeof CURRENCY_CONFIG;

export const getCurrencyDecimals = (code: CurrencyCode): number =>
  CURRENCY_CONFIG[code].decimals;

export const isCurrencyCode = (value: string): value is CurrencyCode => {
  return value in CURRENCY_CONFIG;
};

export const CURRENCIES = Object.keys(CURRENCY_CONFIG) as CurrencyCode[];