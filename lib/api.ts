import { app } from '@/server/elysia'
import { treaty } from '@elysiajs/eden'

export const api = treaty(app).api.elysia
