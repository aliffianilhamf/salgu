"use client";
import Container from "react-bootstrap/Container";
import { notFound } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Permission } from "@/types";
import { getPermissions, updatePermissions } from "./actions";
import PermissionsManager from "./PermissionsManager/PermissionsManager";

export default function ItemSharing({ params }: any) {
  const id: string = params.id;
  let itemTypePlural: string = params.itemType;
  const isNotFound = itemTypePlural !== "files" && itemTypePlural !== "folders";

  const [permissions, setPermissions] = useState<Permission[]>([]);
  const originalPermissions = useRef<Permission[]>([]);

  useEffect(() => {
    if (!id || isNotFound) return;
    getPermissions(itemTypePlural, id).then((permissions) => {
      permissions.sort((a, b) => {
        if (a.isInherited && !b.isInherited) return -1;
        if (!a.isInherited && b.isInherited) return 1;
        return 0;
      });
      setPermissions(permissions);
      originalPermissions.current = permissions;
    });
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
    );
  };

  return (
    <Container className="p-5">
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
