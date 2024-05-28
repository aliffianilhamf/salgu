"use server";

import api from "@/api";

export const getDir = async (id: string) => {
  const res = await api.get(`/dirs/${id}`);
  return res.data;
};
