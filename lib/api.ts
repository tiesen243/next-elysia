import { edenTreaty } from '@elysiajs/eden'

import type { app } from '@/server/elysia'
import { baseUrl } from './site'

export const api = edenTreaty<typeof app>(baseUrl).api.elysia
