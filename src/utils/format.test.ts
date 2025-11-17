import { describe, it, expect } from "vitest";
import { enGB } from "date-fns/locale";

import { formatPaymentDate, formatPaymentAmount } from "./format";
import {
  DATE_FORMAT,
  TIME_FORMAT,
  DEFAULT_LOCALE,
  DEFAULT_TIME_ZONE,
} from "../constants";
import {
  DEFAULT_DECIMALS,
  getCurrencyDecimals,
} from "../constants/currencies";

describe("formatPaymentDate", () => {
  // November 18th 10:00 UTC
  const isoSample = "2025-11-18T10:00:00Z";

  it("formats a valid ISO date using default locale and time zone", () => {
    expect(DATE_FORMAT).toBe(DATE_FORMAT);
    expect(TIME_FORMAT).toBe(TIME_FORMAT);
    expect(DEFAULT_TIME_ZONE).toBe(DEFAULT_TIME_ZONE);
    expect(DEFAULT_LOCALE.dateFns).toBe(enGB);

    const result = formatPaymentDate(isoSample);

    expect(result).toBe("18/11/2025, 10:00:00");
  });

  it("returns the original value for an invalid ISO date string", () => {
    const invalid = "not-a-date";

    const result = formatPaymentDate(invalid);

    expect(result).toBe(invalid);
  });

  it("respects a custom time zone when provided", () => {
    const result = formatPaymentDate(isoSample, {
      timeZone: "America/New_York",
    });

    // 10:00 UTC -> 05:00 in New York (UTC-5) on the same day
    expect(result).toBe("18/11/2025, 05:00:00");
  });
});

describe("formatPaymentAmount", () => {
  it("formats amount with 2 decimals for standard currencies (e.g. USD)", () => {
    const formatted = formatPaymentAmount(1234.5, "USD");

    // en-GB grouping with 2 decimals
    expect(formatted).toBe("1,234.50");
  });

  it("uses currency-specific decimals (e.g. JPY with 0 decimals)", () => {
    const decimalsForJPY = getCurrencyDecimals("JPY");
    expect(decimalsForJPY).toBe(0);

    const formatted = formatPaymentAmount(1000.5, "JPY");

    // Rounded to integer, no decimal part
    expect(formatted).toBe("1,001");
  });

  it("falls back to DEFAULT_DECIMALS for unknown currencies", () => {
    const amount = 987.6;
    const expected = new Intl.NumberFormat(DEFAULT_LOCALE.code, {
      minimumFractionDigits: DEFAULT_DECIMALS,
      maximumFractionDigits: DEFAULT_DECIMALS,
    }).format(amount);

    const formatted = formatPaymentAmount(amount, "XXX");

    expect(formatted).toBe(expected);
  });
});
