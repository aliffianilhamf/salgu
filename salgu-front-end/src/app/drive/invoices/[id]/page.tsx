"use client";
import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import NavInvoice from "@/components/NavInvoice";
import Sidebar from "../../../../../components/Sidebar";
import Homepage from "../../../../../components/HomePage";
import Link from "next/link";

export default function Invoice() {
  const [toggle, setToggle] = useState<boolean>(false);
  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    <Container fluid className="d-flex">
      <div className="container-fluid bg-light min-vh-100">
        <div className="row">
          {toggle && (
            <div className="col-2 bg-white vh-100">
              <Sidebar />
            </div>
          )}
          <div className="col">
            <Homepage Toggle={Toggle} />
            <div className="tw-w-10/12 tw-mx-auto">
              <NavInvoice></NavInvoice>
              <div className="tw-flex tw-justify-center tw-items-center tw-min-h-auto tw-mt-12 tw-flex-col">
                <div className="tw-flex tw-justify-center tw-flex-col  tw-bg-gray-500 tw-rounded tw-p-5 tw-w-full tw-max-w-lg tw-text-white">
                  <h2 className="tw-font-bold">SALGU</h2>
                  <p className="tw-font-blod">Apr 6, 2020, 11:14 PM</p>
                  <div className="tw-flex tw-justify-between">
                    <p>Item</p>
                    <p className="tw-mr-5">Price</p>
                  </div>
                  <hr className="tw-h-px tw-bg-gray-200 tw-border-4 dark:tw-bg-gray-700" />
                  <div className="tw-flex tw-justify-between">
                    <h5>Purchase 1 GB</h5>
                    <h5>Rp. 100000</h5>
                  </div>
                  <hr className="tw-h-px tw-bg-gray-200 tw-border-4 dark:tw-bg-gray-700" />
                  <div className="tw-flex tw-justify-between">
                    <p>Total</p>
                    <p>Rp. 100000</p>
                  </div>
                  <div className="tw-flex tw-flex-col tw-mt-5">
                    <p>Payment Method</p>
                    <p>Paypal</p>
                  </div>
                  <div className="tw-flex tw-flex-col tw-mt-5">
                    <p>Transaction ID</p>
                    <p>TR0908227384</p>
                  </div>
                  <div className="tw-flex tw-flex-col tw-mt-5">
                    <Link href="" className="tw-no-underline tw-text-white">
                      Question or Concern
                    </Link>
                    <Link
                      href=""
                      className="tw-no-underline tw-text-white tw-font-bold"
                    >
                      Contact Salgu
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
