"use client";
import Container from "react-bootstrap/Container";

export default function Folder({ params }: any) {
  const id: string = params.id;
  return (
    <Container className="p-5">
      <p>Browser pada folder dengan id `{id}`</p>
    </Container>
  );
}
