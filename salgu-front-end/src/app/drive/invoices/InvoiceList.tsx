import { Invoice } from "@/types";
import Link from "next/link";
import { parseISO, format } from "date-fns";
import { rupiah } from "@/utils";

type Props = {
  invoices: Invoice[];
};

export default function InvoiceList(props: Props) {
  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.invoices.map((invoice) => (
            <Link
              href={`/drive/invoices/${invoice.id}`}
              className="tw-flex tw-justify-between tw-px-2 tw-text-slate-900 tw-no-underline tw-shadow-md "
              key={invoice.id}
              style={{ display: "table-row" }}
            >
              <td>{invoice.id}</td>
              <td>
                {format(parseISO(invoice.startedAt), "dd MMM yyyy HH:mm")}
              </td>
              <td>{format(parseISO(invoice.endedAt), "dd MMM yyyy HH:mm")}</td>
              <td>{rupiah(invoice.amount)}</td>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
}
