"use client";
import Container from "react-bootstrap/Container";
import Filehistory from "../../../../../../components/FileHistory";

export default function Files({ params }: any) {
  const id: string = params.id;
  return (
    <Container className="p-5">
      <Filehistory />
    </Container>
  );
}
