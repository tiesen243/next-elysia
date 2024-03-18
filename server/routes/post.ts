import { Elysia } from 'elysia'

import db from '@/prisma'
import postDto from '@/server/dto/post.dto'
import { authMiddleware } from '../middleware'

export const postRoute = new Elysia({ prefix: '/post' })
  .use(postDto)

  .get('/getAll', async () => {
    return await db.post.findMany({ include: { author: true } })
  })

  .post(
    '/create',
    async ({ request, body: { title, content } }) => {
      const newPost = await db.post.create({
        data: { title, content, author: { connect: { id: request.user.id } } },
      })
      if (!newPost) throw new Error('Post not created')
      return { message: 'Post created' }
    },
    {
      body: 'create',
      beforeHandle: authMiddleware,
    },
  )
