'use server'

import { api } from '@/lib/api'

export const mutationFn = async (inp: { name: string; email: string; password: string }) => {
  const { data, error } = await api.user.signup.post(inp)
  if (error) throw error
  return data
}
