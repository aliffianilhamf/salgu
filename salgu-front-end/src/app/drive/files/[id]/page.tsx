"use client";
import Container from "react-bootstrap/Container";

export default function File({ params }: any) {
  const id: string = params.id;
  return (
    <Container className="p-5">
      <p>Informasi file dengan id `{id}`</p>
    </Container>
  );
}
