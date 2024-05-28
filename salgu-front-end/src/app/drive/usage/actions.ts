"use server";

import api from "@/api";
import { File, UsageData } from "@/types";

export const getFiles = async (): Promise<File[]> => {
  return api.get("/files").then((res) => res.data);
};

export const getUsage = async (userId: number): Promise<UsageData> => {
  return api.get(`/users/${userId}/usage`).then((res) => res.data);
};
