'use client';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import 'bootstrap/dist/js/bootstrap.min.js';

export default function Folder({ params }: any) {
  const id: string = params.id;
  const [show, setShow] = useState(false);

  return (
    <Container className="p-5">
      <h3 className="text-center">Halaman Folder</h3>
      <div className="card mt-3">
        <div className="card-body">
          {/* <!-- Button trigger modal --> */}
          <div className="float-right mb-3">
            <button type="button" className="btn btn-primary mr-1" data-bs-toggle="modal" data-bs-target="#Share">
              Share
            </button>
            <button type="button" className="btn btn-primary mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">
              Download
            </button>
            <button type="button" className="btn btn-primary mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
              Delete
            </button>
            <button type="button" className="btn btn-primary mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
              Copy Link
            </button>
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
                <th scope="row">1</th>
                <td>Tugas_Cloud-Computing_Shiva-Augusta.pdf</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Tugas_Bahasa-Otomata_Shiva-Augusta.pdf</td>
              </tr>
            </tbody>
          </table>

          {/* <!-- Modal --> */}

          <div className="modal fade" id="Share" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1>Sharing</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <h4>People</h4>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>
                          Lutfi Azis Hafiizhudin <br />
                          <p className="text-secondary">lutfiazishafiizhudin@mail.ugm.ac.id</p>
                        </td>
                        <td>(Owner)</td>
                      </tr>
                      <tr>
                        <td>
                          Gayuh
                          <br />
                          <p className="text-secondary">GayuhGayuh@gayuh.gayuh.com</p>
                        </td>
                        <td>(Editor)</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="d-grid gap-2 col-6 mx-auto ">
                    <button className="btn bg-secondary bg-opacity-25 text-black rounded-pill" type="button">
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
                    <button className="btn bg-secondary bg-opacity-25 text-black rounded-pill" type="button">
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
