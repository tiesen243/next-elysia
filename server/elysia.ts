import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'

import { postRoute } from './routes/post'
import { userRoute } from './routes/user'

export const app = new Elysia({ prefix: '/api/elysia' })
  .onError(({ error, code }) => {
    switch (code) {
      case 'VALIDATION':
        return {
          message: 'Validation error',
          fieldsError: error.all.reduce(
            (acc, x) => {
              acc[String(x.path).slice(1)] = x.message
              return acc
            },
            {} as Record<string, string>,
          ),
        }
      default:
        return { message: error.message }
    }
  })
  .use(swagger())
  .use(userRoute)
  .use(postRoute)

const { handle } = app
export { handle as GET, handle as POST, handle as PUT, handle as DELETE }
