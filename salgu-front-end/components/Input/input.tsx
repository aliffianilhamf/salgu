type InputProps = {
  type: string;
  name: string;
  placeholder?: string;
};

export default function Input(props: InputProps) {
  const { type, name, placeholder } = props;
  return (
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      className="tw-text-sm tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 "
    />
  );
}
