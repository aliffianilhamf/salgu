import Link from "next/link";
import InputBlock from "./Input/Form";
import Button from "./Button";

export default function ListFile() {
  function handleShare() {
    return (window.location.href = "/drive/folders/0000/sharing");
  }
  function handleSelectAll() {
    const checkboxes = document.getElementsByName("check");
    for (let i = 0; i < checkboxes.length; i++) {
      if ((checkboxes[i] as HTMLInputElement).type === "checkbox") {
        (checkboxes[i] as HTMLInputElement).checked = true;
      }
    }
  }
  return (
    <div className="card mt-3">
      <div className="card-body">
        {/* <!-- Button trigger modal --> */}
        <div className="tw-flex tw-border-2 tw-rounded-md tw-w-full tw-max-w-fit tw-p-5 tw-gap-4">
          <Link href="" className="btn bg-secondary text-light">
            Upload File
          </Link>
          <Link href="" className="btn bg-light border ">
            New Folder
          </Link>
        </div>
        <div className="tw-flex tw-justify-between">
          <div>
            <Button
              variant="tw-bg-white hover:tw-bg-gray-200 tw-text-black tw-border"
              onClick={handleSelectAll}
            >
              Select All
            </Button>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button variant="tw-bg-blue-500" onClick={handleShare}>
              Share
            </Button>
            <Button variant="tw-bg-blue-500">Download</Button>
            <Button variant="tw-bg-blue-500">Delete</Button>
            <Button variant="tw-bg-blue-500">Copy Link</Button>
          </div>
        </div>
        <table className="table table-hover">
          <tbody>
            <tr>
              <InputBlock name="check" type="checkbox"></InputBlock>
              <td>
                <Link href="" className="tw-no-underline tw-text-black ">
                  Tugas_Cloud-Computing_Shiva-Augusta.pdf
                </Link>
              </td>
            </tr>
            <tr>
              <InputBlock name="check" type="checkbox"></InputBlock>
              <td>
                <Link href="" className="tw-no-underline tw-text-black">
                  Tugas_Cloud-Computing_Shiva-Augusta.pdf
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
