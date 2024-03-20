import { Elysia } from 'elysia'

import db from '@/prisma'
import { auth } from '@/server/auth'

export const base = new Elysia().state({ db })

export const authMiddleware = new Elysia().derive({ as: 'scoped' }, async ({ set }) => {
  const session = await auth()
  if (!session || !session.user) {
    set.status = 'Unauthorized'
    return { user: { id: '' } }
  }

  return { user: session.user }
})
