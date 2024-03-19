import db from '@/prisma'
import { auth } from '@/server/auth'
import { Elysia } from 'elysia'

export const base = new Elysia().state({ db, user: { id: '' } })

export const authMiddleware = async ({ store, set }: any) => {
  const session = await auth()
  if (!session || !session.user) return (set.status = 'Unauthorized')
  store.user = session.user
}
