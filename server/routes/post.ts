import { Elysia } from 'elysia'

import db from '@/prisma'
import postDto from '@/server/dto/post.dto'
import { authMiddleware } from '../middleware'

export const postRoute = new Elysia({ prefix: '/post' })
  .use(postDto)

  .get('/getAll', async () => {
    return await db.post.findMany({ include: { author: true }, orderBy: { createdAt: 'desc' } })
  })

  .post(
    '/create',
    async ({ request, body: { content } }) => {
      const newPost = await db.post.create({
        data: { content, author: { connect: { id: request.user.id } } },
      })
      if (!newPost) throw new Error('Post not created')
      return { message: 'Post created' }
    },
    { body: 'create', beforeHandle: authMiddleware },
  )
  .delete(
    '/delete',
    async ({ body: { id }, request }) => {
      const post = await db.post.findUnique({ where: { id } })
      if (!post) throw new Error('Post not found')
      if (post.authorId !== request.user.id) throw new Error('You are not the author of this post')
      await db.post.delete({ where: { id } })
      return { message: 'Post deleted' }
    },
    { body: 'delete', beforeHandle: authMiddleware },
  )
