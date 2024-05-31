"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavInvoice from "@/components/NavInvoice";
import { getInvoices } from "./actions";
import InvoiceList from "@/app/drive/invoices/InvoiceList";
import { Invoice } from "@/types";

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [toggle, setToggle] = useState(false);
  const Toggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    getInvoices().then((res) => {
      setInvoices(res);
    });
  }, []);
  return (
    <div className="tw-w-10/12 tw-mx-auto">
      <NavInvoice></NavInvoice>
      <h2 className="tw-mt-10 tw-font-bold">Completed Purchase</h2>
      <hr className="tw-h-px tw-bg-gray-200 tw-border-4 dark:tw-bg-gray-700" />
      <InvoiceList invoices={invoices}></InvoiceList>
    </div>
  );
}
