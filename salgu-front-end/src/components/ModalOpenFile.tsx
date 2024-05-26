export default function ModalOpenFile() {
  const handleOnClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget.id === "container") {
      window.location.href = "/drive/files/";
    }
  };
  return (
    <div
      onClick={handleOnClose}
      id="container"
      className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-30 tw-backdrop-blur-sm tw-flex tw-justify-center tw-items-center  "
    >
      <img src="/img/horizontal.jpg" alt="" className="tw-h-3/4" />
    </div>
  );
}
