import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/dropdown";

type NavbarProps = {
  Toggle: () => void;
};

export default function Navbar({ Toggle }: NavbarProps) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparant px-3">
      <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      ></button>
      <form className="d-flex my-2 my-lg-0">
        <input
          className="form-control me-sm-2"
          type="text"
          placeholder="Enter search terms"
        />
        <button className="btn btn-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <a className="nav-link">
              <i className="bi bi-person-circle"></i>
              <span className="ms-2">Muna</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
