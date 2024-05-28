"use client";
import "./globals.css";
import { Container } from "react-bootstrap";
import Sidebar from "@/components/Sidebar";
import Homepage from "@/components/HomePage";
import { useState } from "react";
import NoSsr from "@/components/NoSsr";
import { AuthProvider } from "@/providers/auth";

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
    <AuthProvider>
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
                  <NoSsr>
                    <Homepage Toggle={Toggle} />
                  </NoSsr>
                  {children}
                </div>
              </div>
            </div>
          </Container>
        </body>
      </html>
    </AuthProvider>
  );
}
