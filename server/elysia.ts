import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'

import { postRoute } from '@/server/routes/post.route'
import { userRoute } from '@/server/routes/user.route'

export const app = new Elysia({ prefix: '/api/elysia' })
  // Plugins
  .use(
    swagger({
      path: '/docs',
      documentation: {
        info: { title: 'Next.js + ElysiaJS', version: '1.0.0' },
        tags: [
          { name: 'User', description: 'User operations' },
          { name: 'Post', description: 'Post operations' },
        ],
      },
    }),
  )

  // Error handling
  .onError(({ error, code }) => {
    switch (code) {
      case 'VALIDATION':
        return {
          message: 'Validation error',
          fieldsError: error.all.reduce(
            (acc, x) => {
              acc[String(x.path).slice(1)] = x.schema.error ?? x.message
              return acc
            },
            {} as Record<string, string>,
          ),
        }
      default:
        return { message: error.message }
    }
  })

  // Routes
  .use(userRoute)
  .use(postRoute)

  .compile()

const { handle } = app
export { handle as DELETE, handle as GET, handle as PATCH, handle as POST }
