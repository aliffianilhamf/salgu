"use server";

import api from "@/api";

export const getFileHistory = async (id: string) => {
  const res = await api.get(`/files/${id}/history`);
  return res.data;
};
