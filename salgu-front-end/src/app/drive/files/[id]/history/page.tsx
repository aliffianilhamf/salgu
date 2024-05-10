"use client";
import Container from "react-bootstrap/Container";

export default function Files({ params }: any) {
  const id: string = params.id;
  return (
    <Container className="p-5">
      <p>History file dengan id `{id}`</p>
    </Container>
  );
}
