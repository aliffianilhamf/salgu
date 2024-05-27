import Link from "next/link";

export default function NavInvoice() {
  return (
    <div className="tw-flex tw-justify-center tw-shadow-sm tw-h-10">
      <Link
        href="/drive/usage"
        className=" tw-text-white tw-no-underline tw-mx-3"
      >
        Activity
      </Link>
      <Link href="" className=" tw-text-white tw-no-underline tw-mx-3">
        Payment Methods
      </Link>
      <Link
        href="/drive/invoices"
        className=" tw-text-white tw-no-underline tw-mx-3"
      >
        Subscriptions & Services
      </Link>
      <Link href="" className=" tw-text-white tw-no-underline tw-mx-3">
        Settings
      </Link>
    </div>
  );
}
