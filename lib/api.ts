import { baseUrl } from '@/lib/site'
import type { app } from '@/server/elysia'
import { treaty } from '@elysiajs/eden'

export const api = treaty<typeof app>(baseUrl).api.elysia
