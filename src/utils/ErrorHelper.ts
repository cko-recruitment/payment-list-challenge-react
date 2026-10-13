import axios from "axios";
import { I18N } from "../constants/i18n";

const getErrorStatus = (error: unknown): number | undefined =>
  axios.isAxiosError(error) ? error.response?.status : undefined;

export const getErrorMessage = (error: unknown): string => {
  switch (getErrorStatus(error)) {
    case 404:
      return I18N.PAYMENT_NOT_FOUND;
    case 500:
      return I18N.INTERNAL_SERVER_ERROR;
    default:
      return I18N.SOMETHING_WENT_WRONG;
  }
};
