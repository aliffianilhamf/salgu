import Input from "./Input";
import Label from "./Label";
import Select from "./Select";

type FormProps = {
  name: string;
  options?: string[]; // Add options prop for radio inputs
  children?: React.ReactNode;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function InputBlock(props: FormProps) {
  const { name, options, children, ...others } = props;
  return (
    <>
      <div className="tw-block">
        <Label htmlFor={name}>{children}</Label>
        {others.type === "select" && <Select name={name} opts={options!} />}
        {others.type !== "select" && <Input name={name} {...others} />}
      </div>
    </>
  );
}
