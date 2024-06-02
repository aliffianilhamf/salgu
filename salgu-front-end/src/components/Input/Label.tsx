import { Children } from "react";

type LabelProps = {
  children: React.ReactNode;
  htmlFor: string;
};

export default function Label(props: LabelProps) {
  const { children, htmlFor } = props;
  return (
    <label
      htmlFor={htmlFor}
      className="tw-block tw-text-md tw-font-blod tw-mb-2"
    >
      {children}
    </label>
  );
}
