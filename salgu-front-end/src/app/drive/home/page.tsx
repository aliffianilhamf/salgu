"use client";
import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Container from "react-bootstrap/Container";
import Sidebar from "../../../../components/SideBar";
import Homepage from "../../../../components/HomePage";

export default function Home() {
  const [toggle, setToggle] = useState(false);
  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    <Container fluid className="d-flex">
      <div className="container-fluid bg-secondary min-vh-100">
        <div className="row">
          {toggle && (
            <div className="col-2 bg-white vh-100">
              <Sidebar />
            </div>
          )}
          <div className="col">
            <Homepage Toggle={Toggle} />
          </div>
        </div>
      </div>
    </Container>
  );
}
