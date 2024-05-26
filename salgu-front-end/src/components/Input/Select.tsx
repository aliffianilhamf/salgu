type SelectProps = {
  name: string;
  opts: string[];
};
export default function Select(props: SelectProps) {
  const { name, opts } = props;
  return (
    <select
      name={name}
      id={name}
      className="tw-text-sm tw-border tw-rounded tw-w-full tw-py-2 tw-px-2  "
    >
      {opts.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
