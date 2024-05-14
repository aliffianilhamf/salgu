"use client";
import Container from "react-bootstrap/Container";

export default function ItemSharing({ params }: any) {
  const id: string = params.id;
  return (
    <Container className="p-5">
      <p>Informasi sharing file/folder dengan id `{id}`</p>
    </Container>
  );
}