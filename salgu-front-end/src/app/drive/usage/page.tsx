"use client";
import Container from "react-bootstrap/Container";
import {
  Dropdown,
  Nav,
  NavDropdown,
  Navbar,
  ProgressBar,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { getFiles, getUsage } from "./actions";

import { File, UsageData } from "@/types";
import useUser from "@/hooks/use-user";
import Link from "next/link";

export default function Usage() {
  const user = useUser();
  const [files, setFiles] = useState<File[]>([]);
  const [usage, setUsage] = useState<UsageData | null>(null);

  useEffect(() => {
    if (!user) return;

    getFiles().then((files) => setFiles(files));
    getUsage(user.sub).then((usage) => setUsage(usage));
  }, [user]);

  return (
    <Container className="p-5">
      <div className="card">
        <div className="card-body">
          <h1 className="mb-3 pb-3">Storage Usage</h1>

          {/* <Dropdown className="d-inline mx-1">
            <Dropdown.Toggle id="dropdown-autoclose-true">Type</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#">Menu Item</Dropdown.Item>
              <Dropdown.Item href="#">Menu Item</Dropdown.Item>
              <Dropdown.Item href="#">Menu Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="d-inline">
            <Dropdown.Toggle id="dropdown-autoclose-true">
              Modified
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#">Menu Item</Dropdown.Item>
              <Dropdown.Item href="#">Menu Item</Dropdown.Item>
              <Dropdown.Item href="#">Menu Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
          <p className="fs-1 pt-3">
            {usage?.amount} bytes (b) or <br />{" "}
            {usage?.amount ? usage?.amount / 1000 : ""} kilobyte (kb) or <br />
            {usage?.amount ? usage?.amount / 1000000 : ""} megabyte (mb) or{" "}
            <br />
            {usage?.amount ? usage?.amount / 1000000000 : ""} gigabyte (gb) of
            usage{" "}
          </p>
          <div className="pb-3">
            {usage?.amount && usage?.amount <= 2000000000 ? (
              <ProgressBar
                variant="info"
                now={usage?.amount}
                max={1000000000}
                animated={true}
                label={`${usage?.amount} bytes`}
              />
            ) : (
              ""
            )}
            {usage?.amount && usage?.amount > 2000000000 ? (
              <ProgressBar
                variant="info"
                now={usage?.amount}
                max={1000000000000}
              />
            ) : (
              ""
            )}
          </div>
          <Navbar className="">
            <Container>
              <Navbar.Brand href="#home">
                Files using Drive storage
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Nav>
                  <NavDropdown
                    id="nav-dropdown-example"
                    title="Storage Used"
                    menuVariant="light"
                  >
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <table className="table pt-3">
            <tbody>
              {files.map((file) => (
                <tr key={file.id}>
                  <td>
                    <Link href={`/drive/files/${file.id}`}>{file.name}</Link>
                  </td>
                  <td>
                    {file.size >= 1000 && file.size <= 1000000
                      ? `${file.size / 1000} kb `
                      : file.size > 1000000 && file.size <= 1000000000
                        ? `${file.size / 1000000} mb `
                        : file.size > 1000000000
                          ? `${file.size / 1000000000} mb `
                          : `${file.size} b `}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
