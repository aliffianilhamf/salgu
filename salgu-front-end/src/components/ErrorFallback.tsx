import { FC } from "react";
import { FallbackProps } from "react-error-boundary";

type Props = FallbackProps;

const ErrorFallback: FC<Props> = ({ error }) => {
  const errorMessage =
    error?.message || "Something went wrong. Please try again later.";
  return (
    <div>
      <p className="tw-text-lg tw-text-red-500">{errorMessage}</p>
    </div>
  );
};

export default ErrorFallback;
