"use client";
import type { Metadata } from "next";
import "./globals.css";
import { Container } from "react-bootstrap";
import Sidebar from "@/components/Sidebar";
import Homepage from "@/components/HomePage";
import { useState } from "react";

// export const metadata: Metadata = {
//   title: "SALGU",
//   description: "SALGU",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [toggle, setToggle] = useState<boolean>(false);
  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    // <html>
    //   <body>{children}</body>
    // </html>
    <html>
      <body>
        <Container fluid className="d-flex">
          <div className="container-fluid tw-bg-white min-vh-100">
            <div className="row">
              {toggle && (
                <div className="col-2 bg-white vh-100">
                  <Sidebar />
                </div>
              )}
              <div className="col">
                <Homepage Toggle={Toggle} />
                {children}
              </div>
            </div>
          </div>
        </Container>
      </body>
    </html>
  );
}
