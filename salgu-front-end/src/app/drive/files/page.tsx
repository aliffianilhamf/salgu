"use client";
import Button from "@/components/Button";
import Form from "@/components/Input/Form";
import ListFile from "@/components/ListFile";
import ModalOpenFile from "@/components/ModalOpenFile";
import Container from "react-bootstrap/Container";

export default function File({ params }: any) {
  return (
    <Container className="p-5">
      <div className="tw-flex tw-justify-end tw-mt-20 tw-max-w-full tw-px-10">
        {/* if you want to use onClick in the button use props onCLick, the default value is () => {} */}
        <Button variant="tw-bg-blue-500 tw-mx-1">Share</Button>
        <Button variant="tw-bg-blue-500 tw-mx-1">Download</Button>
        <Button variant="tw-bg-blue-500 tw-mx-1">Delete</Button>
        <Button variant="tw-bg-blue-500 tw-mx-1">Copy Link</Button>
      </div>
      <div className="tw-flex tw-flex-col tw-max-w-6xl tw-border tw-ml-auto tw-mr-10">
        <ListFile id={"0"}>namafile.jpg</ListFile>
        <ListFile id={"00"}>namafile.jpg</ListFile>
        <ListFile id={"000"}>namafile.jpg</ListFile>
        <ListFile id={"0000"}>namafile.jpg</ListFile>
        <ListFile id={"00000"}>namafile.jpg</ListFile>
        <ListFile id={"000000"}>namafile.jpg</ListFile>
      </div>
    </Container>
  );
}
