import { formatInTimeZone } from "date-fns-tz";
import type { Locale } from "date-fns";

import {
  DATE_FORMAT,
  DEFAULT_LOCALE,
  DEFAULT_TIME_ZONE,
  TIME_FORMAT,
} from "../constants";
import {
  DEFAULT_DECIMALS,
  getCurrencyDecimals,
  isCurrencyCode,
} from "../constants/currencies";
import { isProd } from "../constants/env.ts";
import { I18N } from "../constants/i18n.ts";

interface FormatDateOptions {
  locale?: Locale;
  timeZone?: string;
}

export const formatPaymentDate = (
  isoDate: string,
  options: FormatDateOptions = {}
): string => {
  if (!isoDate) {
    if (!isProd) {
      console.error(I18N.DATE_FORMAT_ERROR, isoDate, options);
    }
    return isoDate;
  }

  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    if (!isProd) {
      console.error(I18N.INVALID_ISO_DATE, isoDate, options);
    }
    return isoDate;
  }

  const locale = options.locale ?? DEFAULT_LOCALE.dateFns;
  const timeZone = options.timeZone ?? DEFAULT_TIME_ZONE;

  try {
    return formatInTimeZone(
      date,
      timeZone,
      `${DATE_FORMAT}, ${TIME_FORMAT}`,
      { locale }
    );
  } catch (error) {
    if (!isProd) {
      console.error(
        I18N.DATE_FORMAT_ERROR,
        error,
        isoDate,
        options
      );
    }
    return isoDate;
  }
};

export const formatPaymentAmount = (
  amount: number,
  currency: string
): string => {
  if (!Number.isFinite(amount)) {
    if (!isProd) {
      console.error(
        I18N.AMOUNT_FORMAT_ERROR,
        I18N.NON_FINITE_AMOUNT,
        amount,
        currency
      );
    }

    return String(amount);
  }

  const decimals = isCurrencyCode(currency)
    ? getCurrencyDecimals(currency)
    : DEFAULT_DECIMALS;

  try {
    return new Intl.NumberFormat(DEFAULT_LOCALE.code, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);
  } catch (error) {
    if (!isProd) {
      console.error(
        I18N.AMOUNT_FORMAT_ERROR,
        error,
        amount,
        currency,
        decimals
      );
    }

    return amount.toFixed(decimals);
  }
};
