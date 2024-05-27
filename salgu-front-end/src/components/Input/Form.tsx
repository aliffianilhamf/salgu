import Input from "./Input";
import Label from "./Label";
import Select from "./Select";

type FormProps = {
  children?: React.ReactNode;
  name: string;
  type: string;
  placeholder?: string;
  options?: string[]; // Add options prop for radio inputs
};

export default function Form(props: FormProps) {
  const { children, name, type, placeholder, options } = props;
  return (
    <>
      <div className="tw-block">
        <Label htmlFor={name}>{children}</Label>
        {type === "select" && options ? (
          <Select name={name} opts={options}></Select>
        ) : type === "checkbox" ? (
          // input biasa
          <Input name={name} type={type} />
        ) : (
          // input biasa
          <Input name={name} type={type} placeholder={placeholder} />
        )}
      </div>
    </>
  );
}
