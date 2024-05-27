"use client";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "bootstrap/dist/js/bootstrap.min.js";
import InputBlock from "@/components/Input/Form";
import Link from "next/link";
import Button from "@/components/Button";
export default function Folder({ params }: any) {
  const id: string | undefined = params.id;
  const [show, setShow] = useState(false);

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
    <Container className="p-5">
      <h3 className="text-center">Halaman Folder</h3>
      <div className="card mt-3">
        <div className="card-body">
          {/* <!-- Button trigger modal --> */}
          <div className="tw-flex tw-border-2 tw-rounded-md tw-w-full tw-max-w-fit tw-p-5 tw-gap-4">
            {/* <button className="btn btn-dark mr-1" type="button">
          File
        </button>
        <button className="btn btn-dark" type="button">
          Folder
        </button> */}
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
            {/* <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Folders</th>
              </tr>
            </thead> */}
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

          {/* <!-- Modal --> */}

          <div
            className="modal fade"
            id="Share"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1>Sharing</h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <h4>People</h4>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>
                          Lutfi Azis Hafiizhudin <br />
                          <p className="text-secondary">
                            lutfiazishafiizhudin@mail.ugm.ac.id
                          </p>
                        </td>
                        <td>(Owner)</td>
                      </tr>
                      <tr>
                        <td>
                          Gayuh
                          <br />
                          <p className="text-secondary">
                            GayuhGayuh@gayuh.gayuh.com
                          </p>
                        </td>
                        <td>(Editor)</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="d-grid gap-2 col-6 mx-auto ">
                    <button
                      className="btn bg-secondary bg-opacity-25 text-black rounded-pill"
                      type="button"
                    >
                      Add User
                    </button>
                  </div>
                  <h4 className="pt-4">Organization</h4>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>
                          UGM <br />
                          <p className="text-secondary">*@mail.ugm.ac.id</p>
                        </td>
                        {/* <td>(Editor)</td> */}
                      </tr>
                      <tr>
                        <td>
                          ITB <br />
                          <p className="text-secondary">*@itb.ac.id</p>
                        </td>
                        {/* <td>(Viewer)</td> */}
                      </tr>
                    </tbody>
                  </table>
                  <div className="d-grid gap-2 pb-3 col-6 mx-auto ">
                    <button
                      className="btn bg-secondary bg-opacity-25 text-black rounded-pill"
                      type="button"
                    >
                      Add Organizations
                    </button>
                  </div>
                  <div className="modal-footer">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button className="btn btn-primary me-md-2" type="button">
                        Copy Link
                      </button>
                      <button className="btn btn-primary" type="button">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* akhir modal */}
        </div>
      </div>
    </Container>
  );
}
