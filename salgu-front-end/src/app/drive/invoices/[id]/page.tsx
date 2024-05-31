"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import NavInvoice from "@/components/NavInvoice";
import Sidebar from "../../../../components/Sidebar";
import Homepage from "../../../../components/HomePage";
import Link from "next/link";
import { getInvoice } from "../actions";
import { Invoice } from "@/types";
import { parseISO, format } from "date-fns";
import { rupiah } from "@/utils";

export default function InvoiceDetail({ params }: any) {
  const id: string = params.id;
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  const Toggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    getInvoice(id).then((res) => {
      setInvoice(res);
    });
  }, [id]);
  return (
    <div className="tw-w-10/12 tw-mx-auto">
      <NavInvoice></NavInvoice>
      <div className="tw-flex tw-justify-center tw-items-center tw-min-h-auto tw-mt-12 tw-flex-col">
        <div className="tw-flex tw-justify-center tw-flex-col  tw-bg-gray-500 tw-rounded tw-p-5 tw-w-full tw-max-w-lg tw-text-white">
          <h2 className="tw-font-bold">SALGU</h2>
          <p className="tw-font-blod">
            {" "}
            {invoice && format(parseISO(invoice.endedAt), "dd MMM yyyy HH:mm")}
          </p>
          <div className="tw-flex tw-justify-between">
            <p>Item</p>
            <p className="tw-mr-5">Price</p>
          </div>
          <hr className="tw-h-px tw-bg-gray-200 tw-border-4 dark:tw-bg-gray-700" />
          <div className="tw-flex tw-justify-between">
            <h5>
              Purchase Month{" "}
              {invoice && format(parseISO(invoice.startedAt), "MMMM")}
            </h5>
            <h5>{invoice && rupiah(invoice.amount)}</h5>
          </div>
          <hr className="tw-h-px tw-bg-gray-200 tw-border-4 dark:tw-bg-gray-700" />
          <div className="tw-flex tw-justify-between">
            <p>Total</p>
            <p>{invoice && rupiah(invoice.amount)}</p>
          </div>
          <div className="tw-flex tw-flex-col tw-mt-5">
            <p>Payment Method</p>
            <p>Virtual Account - 601201027789537</p>
          </div>
          <div className="tw-flex tw-flex-col tw-mt-5">
            <p>Transaction ID</p>
            <p>INVOICE-{invoice && invoice.id}</p>
          </div>
          <div>
            <p>
              Status :{" "}
              {invoice?.paid === true && invoice?.isFinal === true
                ? "Paid"
                : invoice?.paid === false && invoice?.isFinal === true
                  ? "Waiting Payment"
                  : "Nonfinal"}
            </p>
          </div>
          <div className="tw-flex tw-flex-col tw-mt-5">
            <Link
              href="https://www.instagram.com/alippwd"
              className="tw-no-underline tw-text-white"
            >
              Question or Concern
            </Link>
            <Link
              href="https://www.instagram.com/alippwd"
              target="_blank"
              className="tw-no-underline tw-text-white tw-font-bold"
            >
              Contact Salgu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
