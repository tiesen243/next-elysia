import { app } from '@/server/elysia'
import { edenTreaty } from '@elysiajs/eden'
import { baseUrl } from './site'

import * as reactQuery from '@tanstack/react-query'

// uncomment the line below will throw an error
/* export const api = treaty(app).api.elysia */

export const api = edenTreaty<typeof app>(baseUrl).api.elysia

// Create a new query client
const createQueryClient = () => new reactQuery.QueryClient()
let clientQueryClientSingleton: reactQuery.QueryClient | undefined = undefined
export const getQueryClient = () => {
  if (typeof window === 'undefined') return createQueryClient()
  return (clientQueryClientSingleton ??= createQueryClient())
}

// custom error type
export const useMutation = <T>(
  params: reactQuery.MutationOptions<
    Record<string, string>,
    { message: string; fieldsError?: Record<string, string> },
    T
  >,
) => reactQuery.useMutation(params)
