import Form from "./Input/Form";

type ListFileProps = {
  children?: React.ReactNode;
  id: string;
};

export default function ListFile(props: ListFileProps) {
  const { children, id } = props;
  const handleOnClick = () => {
    window.location.href = `/drive/files/${id}`;
  };
  return (
    <button
      onClick={handleOnClick}
      className="tw-flex tw-justify-start tw-items-center tw-border tw-m-1 tw-w-auto tw-bg-slate-100"
    >
      <div className="tw-ml-2 tw-pb-2">
        <Form name="check" type="checkbox"></Form>
      </div>
      <div className="tw-ml-2 tw-pb-2 ">{children}</div>
    </button>
  );
}
