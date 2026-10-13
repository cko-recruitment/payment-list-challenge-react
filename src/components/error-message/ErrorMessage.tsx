import { getErrorMessage } from "../../utils/ErrorHelper";
import { ErrorBox } from "../components";

const ErrorMessage: React.FC<{ error: unknown }> = ({ error }) => {
  const message = getErrorMessage(error);
  return <ErrorBox role="alert">{message}</ErrorBox>;
};

export default ErrorMessage;
