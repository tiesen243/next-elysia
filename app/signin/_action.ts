'use server'

import { signIn } from '@/server/auth'

export const login = async (data: { email: string; password: string }) => {
  try {
    await signIn('credentials', { ...data, redirect: false })
    return { success: true }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { success: false, message: e.cause.message ?? e.cause.err.message, fieldsError: e.cause.fieldsError }
  }
}
