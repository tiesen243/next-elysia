import { auth } from '@/server/auth'

export const authMiddleware = async ({ store, set }: any) => {
  const session = await auth()
  if (!session || !session.user) return (set.status = 'Unauthorized')
  store.user = session.user
}
