import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Sidebar({}) {
  return (
    <div className="d-flex flex-column bg-white sidebar p-2 min-vh-100 ">
      <div className="m-2">
        <span className="brand-name fs-4">SALGU</span>
      </div>
      <hr className="text-dark" />
      <div className="flex-grow-1">
        <div className="list-group list-group-flush">
          <Link
            href="/drive/home"
            className="list-group-item py-1 mb-2"
            aria-current="page"
          >
            <i className="bi bi-speedometer fs-5 me-3"></i>
            <span className="fs-5">Dashboard</span>
          </Link>
          <Link href="/drive/invoices" className="list-group-item py-1 mb-2">
            <i className="bi bi-bar-chart-line-fill fs-5 me-3"></i>
            <span className="fs-5">Statistics</span>
          </Link>
        </div>
      </div>
      <div>
        <Link href="/" className="list-group-item py-1 mb-2">
          <i className="bi bi-power fs-5 me-3"></i>
          <span className="fs-5">Sign Out</span>
        </Link>
      </div>
    </div>
  );
}
