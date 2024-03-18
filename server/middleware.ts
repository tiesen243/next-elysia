import { auth } from './auth'

export const authMiddleware = async ({ set, request }: any) => {
  const session = await auth()
  if (!session || !session.user) return (set.status = 'Unauthorized')
  request.user = session.user
}
