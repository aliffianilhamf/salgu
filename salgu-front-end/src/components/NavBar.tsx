import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from "react-bootstrap/Button";
import useUser from "@/hooks/use-user";

type NavbarProps = {
  Toggle: () => void;
};

export default function Navbar({ Toggle }: NavbarProps) {
  const user = useUser();
  if (!user) return null;

  return (
    <nav className="navbar navbar-expand-sm navbar-dark tw-bg-white px-3 rounded-2 ">
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon "></span>
      </button>
      {/* <form className="d-flex my-2 my-lg-0">
        <input
          className="form-control me-sm-2"
          type="text"
          placeholder="Enter search terms"
        />
        <Button variant="secondary" className="my-2 my-sm-0" type="submit">
          Search
        </Button>
      </form> */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0 ">
          <li className="nav-item">
            <a className="nav-link">
              <i className="bi bi-person-circle text-black "></i>
              <span className="ms-2 text-black">{user.firstName}</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
