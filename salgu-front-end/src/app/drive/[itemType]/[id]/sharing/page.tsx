"use client";
import Container from "react-bootstrap/Container";
import { notFound } from "next/navigation";

export default function ItemSharing({ params }: any) {
  const id: string = params.id;
  let itemType: string = params.itemType;
  if (itemType !== "files" && itemType !== "folders") {
    return notFound();
  }
  // Remove the s from `itemType`
  itemType = itemType.slice(0, -1);

  return (
    <Container className="p-5">
      <p>
        Informasi sharing {itemType} dengan id `{id}`
      </p>
    </Container>
  );
}
