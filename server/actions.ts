"use server";

import { api } from "@/lib/api";

export const create = async (formData: FormData) => {
  const title = String(formData.get("title"));
  const { data, error } = await api.post.create.post({ title });
  if (error) return { error, data: null };
  return { data, error: null };
};
