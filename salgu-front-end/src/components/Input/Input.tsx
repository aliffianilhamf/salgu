type InputProps = {
  type: string;
  name: string;
  placeholder?: string;
  value?: string; // Add value prop for radio inputs
};

export default function Input(props: InputProps) {
  const { type, name, placeholder, value } = props;
  return (
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value} // Add value attribute
      className="tw-text-sm tw-border tw-rounded tw-w-full tw-py-2 tw-px-3 "
    />
  );
}
