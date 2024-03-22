import { baseUrl } from '@/lib/site'
import type { app } from '@/server/elysia'
import { edenTreaty } from '@elysiajs/eden/treaty'

export const api = edenTreaty<typeof app>(baseUrl).api.elysia
