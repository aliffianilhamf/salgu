import Input from "./input";
import Label from "./label";

type FormProps = {
  children: React.ReactNode;
  name: string;
  type: string;
  placeholder?: string;
};

export default function Form(props: FormProps) {
  const { children, name, type, placeholder } = props;
  return (
    <>
      <Label htmlFor={name}>{children}</Label>
      <Input name={name} type={type} placeholder={placeholder}></Input>
    </>
  );
}
