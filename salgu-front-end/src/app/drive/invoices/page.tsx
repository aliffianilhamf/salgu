"use client";
import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Sidebar from "../../../components/Sidebar";
import Homepage from "../../../components/HomePage";
import NavInvoice from "@/components/NavInvoice";
import Table from "@/components/Table/Table";

export default function Invoices() {
  const [toggle, setToggle] = useState<boolean>(false);
  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className="tw-w-10/12 tw-mx-auto">
      <NavInvoice></NavInvoice>
      <h2 className="tw-mt-10 tw-font-bold">Completed Purchase</h2>
      <hr className="tw-h-px tw-bg-gray-200 tw-border-4 dark:tw-bg-gray-700" />
      <Table></Table>
    </div>
  );
}
