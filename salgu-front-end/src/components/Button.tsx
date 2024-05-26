type ButtonProps = {
  children?: React.ReactNode;
  variant?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function Button(props: ButtonProps) {
  const { children, variant, type = "button", onClick = () => {} } = props;
  return (
    <button
      type={type}
      className={` tw-rounded-md tw-px-3 tw-py-2 tw-my-2 tw-text-sm tw-font-semibold tw-text-white hover:tw-bg-blue-600 ${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
