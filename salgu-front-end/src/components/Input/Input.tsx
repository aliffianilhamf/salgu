type InputProps = {
  className?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function Input(props: InputProps) {
  const { className, ...others } = props;
  return (
    <input
      className={
        "tw-text-sm tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 " + className
      }
      {...others}
    />
  );
}
