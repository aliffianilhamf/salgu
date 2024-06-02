"use client";
import Container from "react-bootstrap/Container";
import { notFound } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Permission } from "@/types";
import { getPermissions, updatePermissions } from "./actions";
import PermissionsManager from "./PermissionsManager/PermissionsManager";
import { getDir } from "@/app/drive/folders/[id]/actions";
import { getFile } from "@/app/drive/files/[id]/actions";

export default function ItemSharing({ params }: any) {
  const id: string = params.id;
  let itemTypePlural: string = params.itemType;
  const isNotFound = itemTypePlural !== "files" && itemTypePlural !== "folders";
  const shareLink = `${process.env.NEXT_PUBLIC_HOST}/drive/${itemTypePlural}/${id}`;

  if (itemTypePlural === "folders") itemTypePlural = "dirs";

  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [currPath, setCurrPath] = useState<string | null>(null);
  const originalPermissions = useRef<Permission[]>([]);

  const processPermissions = (permissions: Permission[]) => {
    permissions.sort((a, b) => {
      if (a.isInherited && !b.isInherited) return -1;
      if (!a.isInherited && b.isInherited) return 1;
      return 0;
    });
    setPermissions(permissions);
    originalPermissions.current = permissions;
  };

  useEffect(() => {
    if (!id || isNotFound) return;

    if (itemTypePlural === "dirs")
      getDir(id).then((dir) => setCurrPath(dir.path));
    else getFile(id).then((file) => setCurrPath(file.name));

    getPermissions(itemTypePlural, id).then(processPermissions);
  }, [id, isNotFound, itemTypePlural]);

  // Remove the s from `itemType`
  const itemType = itemTypePlural.slice(0, -1);

  if (isNotFound) return notFound();

  const handlePermissionsChange = (permissions: Permission[]) => {
    setPermissions(permissions);
  };

  const handlePermissionsSave = () => {
    updatePermissions(
      itemTypePlural,
      id,
      originalPermissions.current,
      permissions,
    ).then(processPermissions);
  };

  return (
    <Container className="p-5">
      {currPath && <p>{currPath}</p>}
      <button
        className="btn btn-outline-dark"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
        }}
      >
        Copy link
      </button>
      <div id="container">
        <div className="tw-flex tw-justify-center tw-items-center">
          <div className="">
            <div className="">
              <h1>Sharing</h1>
              <PermissionsManager
                permissions={permissions}
                onChange={handlePermissionsChange}
                onSave={handlePermissionsSave}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
