"use server";

import api from "@/api";

export const getDir = async (id: string) => {
  const res = await api.get(`/dirs/${id}`);
  return res.data;
};

export const deleteDirsById = async (ids: string[]) => {
  const deletePromises = ids.map(id => api.delete(`${process.env.NEXT_PUBLIC_API_URL}/dirs/${id}`));
  try {
    await Promise.all(deletePromises);
    console.log('All selected directories have been deleted');
  } catch (error) {
    console.error('Error deleting directories:', error);
  }
}