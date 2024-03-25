import type { app } from '@/server/elysia'
import { treaty } from '@elysiajs/eden'
import { getBaseUrl } from './site'

export const api = treaty<typeof app>(getBaseUrl()).api.elysia
