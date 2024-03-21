import { Elysia } from 'elysia'

import { auth } from '@/server/auth'

const AuthService = new Elysia().derive({ as: 'scoped' }, async ({ error }) => {
  const session = await auth()
  if (!session || !session.user)
    return error('Unauthorized', { message: 'You are not authorized to access this resource' })
  return { user: session.user }
})

export default AuthService
