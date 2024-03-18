import { app } from '@/server/elysia'
import { edenTreaty } from '@elysiajs/eden'
import { baseUrl } from './site'

export const api = edenTreaty<typeof app>(baseUrl).api.elysia
