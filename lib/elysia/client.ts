import { edenTreaty } from '@elysiajs/eden'
import { QueryClient } from '@tanstack/react-query'

import { baseUrl } from '@/lib/site'
import type { app } from '@/server/elysia'

export const api = edenTreaty<typeof app>(baseUrl).api.elysia

const createQueryClient = () => new QueryClient()
let clientQueryClientSingleton: QueryClient | undefined = undefined
export const getQueryClient = () => {
  if (typeof window === 'undefined') return createQueryClient()
  return (clientQueryClientSingleton ??= createQueryClient())
}
