"use server";

import api from "@/api";

export const getFileHistory = async (id: string) => {
  const res = await api.get(`/files/${id}/history`);
  return res.data;
};

export const deleteFilesById = async (ids: string[]) => {
  const deletePromises = ids.map((id) =>
    api.delete(`${process.env.NEXT_PUBLIC_API_URL}/files/${id}`),
  );
  try {
    await Promise.all(deletePromises);
    console.log("All selected files have been deleted");
  } catch (error) {
    console.error("Error deleting files:", error);
  }
};
