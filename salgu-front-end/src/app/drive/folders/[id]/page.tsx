"use client";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.min.js";
import { getDir } from "./actions";
import { Dir } from "@/types";
import Browser from "@/components/Browser";

export default function Folder({ params }: any) {
  const dirId: string | undefined = params.id;
  const [currDir, setCurrDir] = useState<Dir | null>(null);

  useEffect(() => {
    if (dirId)
      getDir(dirId).then((res) => {
        setCurrDir(res);
      });
  }, [dirId]);

  const currPath = currDir ? currDir.path : "/My Drive/";

  const files = currDir?.fileChildren || [];
  const dirs = currDir?.dirChildren || [];

  return (
    <Container className="p-5">
      <div className="card mt-3">
        {currDir && (
          <Browser
            files={files}
            dirs={dirs}
            currPath={currPath}
            currDir={currDir}
          />
        )}
      </div>
    </Container>
  );
}
