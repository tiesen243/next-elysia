import { Elysia } from 'elysia'

import { auth } from '@/server/auth'

const AuthService = new Elysia().derive({ as: 'scoped' }, async ({ set }) => {
  const session = await auth()
  if (!session || !session.user) {
    set.status = 'Unauthorized'
    throw new Error('You are not signed in')
  }

  return { user: session.user }
})

export default AuthService
