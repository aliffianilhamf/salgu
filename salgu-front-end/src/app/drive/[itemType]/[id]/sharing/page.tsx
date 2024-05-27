"use client";
import Container from "react-bootstrap/Container";
import { notFound } from "next/navigation";

export default function ItemSharing({ params }: any) {
  const id: string = params.id;
  let itemType: string = params.itemType;
  if (itemType !== "files" && itemType !== "folders") {
    return notFound();
  }
  // Remove the s from `itemType`
  itemType = itemType.slice(0, -1);

  return (
    <Container className="p-5">
      <div id="container">
        {/* <div className="tw-border tw-w-full tw-max-w-lg tw-p-2 tw-bg-white tw-rounded-md">
          <h2 className="tw-font-bold tw-text-5xl">Sharing</h2>
          <hr className="tw-border-2" />
          <h2 className="tw-font-bold tw-text-2xl">People</h2>
          <div className="tw-flex tw-justify- ">
            <p>Lutfi Azis Hafiizhudin</p>
            <p>(Owner)</p>
          </div>
        </div> */}
        <div className="tw-flex tw-justify-center tw-items-center">
          <div className="tw-w-1/2 ">
            <div className="">
              <div className="">
                <h1>Sharing</h1>
              </div>
              <div className="">
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
                <div className="">
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
      </div>
    </Container>
  );
}
