import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import useSignOut from "@/hooks/use-sign-out";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/use-user";

export default function Sidebar({}) {
  const signOut = useSignOut();
  const router = useRouter();
  function handleSignOut() {
    signOut();
    router.push("/");
  }
  const user = useUser();
  if (!user) return null;
  return (
    <div className="col-2 bg-white vh-100">
      <div className="d-flex flex-column bg-white sidebar p-2 ">
        <div className="m-2">
          <span className="brand-name fs-4 tw-font-bold">SALGU</span>
        </div>
        <hr className="text-dark" />
        <div className="flex-grow-1 ">
          <div className="list-group list-group-flush">
            <Link
              href="/drive/home"
              className=" list-group-item py-1 mb-2 border-0 "
              aria-current="page"
            >
              <i className="bi bi-speedometer fs-5 me-3"></i>
              <span className="fs-5 ">My Drive</span>
            </Link>
            <Link
              href="/drive/usage"
              className="list-group-item py-1 mb-2  border-0"
            >
              <i className="bi bi-bar-chart-line-fill fs-5 me-3"></i>
              <span className="fs-5">Usage</span>
            </Link>
            <Link
              href="/drive/invoices"
              className="list-group-item py-1 mb-2  border-0"
            >
              <i className="bi bi-activity fs-5 me-3"></i>
              <span className="fs-5">Invoice</span>
            </Link>
            <Link
              href="/drive/trash"
              className="list-group-item py-1 mb-2  border-0"
            >
              <i className="bi bi-trash fs-5 me-3"></i>
              <span className="fs-5">Trash</span>
            </Link>
            <hr />
            <div className="tw-px-4">
              <button onClick={handleSignOut} className="  mb-2  ">
                <i className="bi bi-power fs-5 me-3"></i>
                <span className="fs-5">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
