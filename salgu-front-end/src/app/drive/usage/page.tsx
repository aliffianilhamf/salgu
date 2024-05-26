'use client';
import Container from 'react-bootstrap/Container';
import { Dropdown, Nav, NavDropdown, Navbar, ProgressBar } from 'react-bootstrap';
Dropdown;

export default function Usage() {
  return (
    <Container className="p-5">
      <div className="card">
        <div className="card-body">
          <h1 className="mb-3 pb-3">Storage</h1>

          <Dropdown className="d-inline mx-1">
            <Dropdown.Toggle id="dropdown-autoclose-true">Type</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#">Menu Item</Dropdown.Item>
              <Dropdown.Item href="#">Menu Item</Dropdown.Item>
              <Dropdown.Item href="#">Menu Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="d-inline">
            <Dropdown.Toggle id="dropdown-autoclose-true">Modified</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#">Menu Item</Dropdown.Item>
              <Dropdown.Item href="#">Menu Item</Dropdown.Item>
              <Dropdown.Item href="#">Menu Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <p className="fs-1 pt-3">143.6 MB of usage </p>
          <div className="pb-3">
            <ProgressBar variant="info" now={20} />
          </div>
          <Navbar className="">
            <Container>
              <Navbar.Brand href="#home">Files using Drive storage</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Nav>
                  <NavDropdown id="nav-dropdown-example" title="Storage Used" menuVariant="light">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <table className="table pt-3">
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td className="mr-1">Tugas_Cloud-Computing_Shiva-Augusta.pdf</td>
                <td className="justify-content-end text-center"> 123 Mb</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Tugas_Bahasa-Otomata_Shiva-Augusta.pdf</td>
                <td className="justify-content-end text-center "> 123 kB </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td className="mr-1">Tugas_Big-Data_Shiva-Augusta.pdf</td>
                <td className="justify-content-end text-center"> 123 Mb</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Tugas_Computer-Network_Shiva-Augusta.pdf</td>
                <td className="justify-content-end text-center "> 123 kB </td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td className="mr-1">Tugas_CV_Shiva-Augusta.pdf</td>
                <td className="justify-content-end text-center"> 123 Mb</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>Tugas_IEEE_Shiva-Augusta.pdf</td>
                <td className="justify-content-end text-center "> 123 kB </td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td className="mr-1">Tugas_ML_Shiva-Augusta.pdf</td>
                <td className="justify-content-end text-center"> 123 Mb</td>
              </tr>
              <tr>
                <th scope="row">8</th>
                <td>Tugas_Bahasa-Otomata_Shiva-Augusta.pdf</td>
                <td className="justify-content-end text-center "> 123 kB </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
