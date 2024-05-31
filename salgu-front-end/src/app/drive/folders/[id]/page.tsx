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
  // Increment this flag to refresh.
  const [refreshFlag, setRefreshFlag] = useState(0);

  useEffect(() => {
    if (dirId)
      getDir(dirId).then((res) => {
        setCurrDir(res);
      });
  }, [dirId, refreshFlag]);

  const currPath = currDir ? currDir.path : "/My Drive/";

  const files = currDir?.fileChildren || [];
  const dirs = currDir?.dirChildren || [];

  return (
    <Container className="p-5">
      <h3 className="text-center">Halaman Folder</h3>
      <div className="card mt-3">
        {currDir && (
          <Browser
            files={files}
            dirs={dirs}
            currPath={currPath}
            currDir={currDir}
            onRefreshRequired={() => setRefreshFlag(refreshFlag + 1)}
          />
        )}
      </div>
    </Container>
  );
}
