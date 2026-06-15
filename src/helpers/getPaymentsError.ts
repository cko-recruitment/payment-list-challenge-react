import axios from "axios";
import { I18N } from "../constants/i18n";
import { PaymentSearchResponse } from "../types/payment";

export const getPaymentsError = (
  queryError: unknown,
  data: PaymentSearchResponse | undefined,
): string | null => {
  if (axios.isAxiosError(queryError)) {
    switch (queryError.response?.status) {
      case 404: return I18N.PAYMENT_NOT_FOUND;
      case 500: return I18N.INTERNAL_SERVER_ERROR;
      default:  return I18N.SOMETHING_WENT_WRONG;
    }
  }
  if (queryError) return I18N.SOMETHING_WENT_WRONG;   
  if ( data?.payments.length === 0) return I18N.PAYMENT_NOT_FOUND;
  return null;
};