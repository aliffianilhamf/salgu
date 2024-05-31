"use client";
import Browser from "@/components/Browser";
import Link from "next/link";
import Container from "react-bootstrap/Container";

export default function File({ params }: any) {
  const id: string = params.id;

  return (
    <Container className="p-5">
      <div className="tw-flex tw-gap-2">
        <Link href="" className="btn btn-dark">
          Sharing
        </Link>
        <Link
          href={`${process.env.NEXT_PUBLIC_HOST}/drive/files/${id}/history`}
          className="btn btn-light border"
        >
          History
        </Link>
      </div>
      <div className="tw-flex tw-justify-center tw-items-center tw-w-full tw-min-h-screen">
        <div className="">
          <img src="/img/horizontal.jpg" alt="" />
        </div>
      </div>
    </Container>
  );
}
