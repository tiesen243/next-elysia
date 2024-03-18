import { app } from '@/server/elysia'
import { edenTreaty, treaty } from '@elysiajs/eden'
import { baseUrl } from './site'

// uncomment the line below will throw an error
/* export const api = treaty(app).api.elysia */

export const api = edenTreaty<typeof app>(baseUrl).api.elysia
