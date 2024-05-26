"use client";
import Button from "@/components/Button";
import Form from "@/components/Input/Form";
import Container from "react-bootstrap/Container";

export default function File({ params }: any) {
  const id: string = params.id;
  return (
    <Container className="p-5">
      <div
        id="container"
        className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-30 tw-backdrop-blur-sm tw-flex tw-justify-center tw-items-center  "
      >
        <img src="/img/horizontal.jpg" alt="" className="tw-h-3/4" />
      </div>
    </Container>
  );
}
