'use server'

import { api } from '@/lib/api'
import { revalidatePath } from 'next/cache'

export const create = async (inp: { title: string; content: string }) => {
  const { data, error } = await api.post.create.post(inp)
  if (error) throw error
  revalidatePath('/')
  return data
}
