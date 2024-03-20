import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'

import { postRoute } from '@/server/routes/post.route'
import { userRoute } from '@/server/routes/user.route'

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
  .use(
    swagger({
      scalarConfig: { theme: 'moon' },
      documentation: {
        info: { title: 'Next.js + ElysiaJS', version: '1.0.0' },
        tags: [
          { name: 'User', description: 'User operations' },
          { name: 'Post', description: 'Post operations' },
        ],
      },
    }),
  )

  // Routes
  .use(userRoute)
  .use(postRoute)

const { handle } = app
export { handle as GET, handle as POST, handle as PATCH, handle as DELETE }

export type App = typeof app
