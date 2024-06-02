"use server";

import api from "@/api";
import { Permission } from "@/types";

export const getPermissions = async (
  subjectCollection: string,
  subjectId: string,
): Promise<Permission[]> => {
  const res = await api.get(`/${subjectCollection}/${subjectId}/permissions`, {
    params: { includeInherited: true },
  });
  return res.data;
};

export const updatePermissions = async (
  subjectCollection: string,
  subjectId: string,
  oldPermissions: Permission[],
  newPermissions: Permission[],
) => {
  const deletedPermissions = oldPermissions.filter(
    (oldPermission) =>
      !newPermissions.find(
        (newPermission) => newPermission.id === oldPermission.id,
      ),
  );

  const addedPermissions = newPermissions.filter(
    (newPermission) => newPermission.id === -1,
  );

  const updatedPermissions = newPermissions.filter(
    (newPermission) => newPermission.id !== -1,
  );

  for (const permission of addedPermissions) {
    // @ts-expect-error Delete the id with value -1
    delete permission.id;
    delete permission.fileId;
    delete permission.dirId;

    await api.post(
      `/${subjectCollection}/${subjectId}/permissions`,
      permission,
    );
  }

  for (const permission of updatedPermissions) {
    await api.patch(
      `/${subjectCollection}/${subjectId}/permissions/${permission.id}`,
      {
        domains: permission.domains,
        level: permission.level,
        userEmails: permission.userEmails,
      },
    );
  }

  for (const permission of deletedPermissions) {
    await api.delete(
      `/${subjectCollection}/${subjectId}/permissions/${permission.id}`,
    );
  }

  return getPermissions(subjectCollection, subjectId);
};
