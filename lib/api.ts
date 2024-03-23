import { baseUrl } from '@/lib/site'
import type { app } from '@/server/elysia'
import { edenTreaty } from '@elysiajs/eden/treaty'
import { edenFetch } from '@elysiajs/eden/fetch'

export const api = edenTreaty<typeof app>(baseUrl).api.elysia

export const fetch = edenFetch<typeof app>(baseUrl)
