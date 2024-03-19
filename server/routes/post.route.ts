import { Elysia } from 'elysia'

import postDto from '@/server/dto/post.dto'
import { authMiddleware, base } from '@/server/plugin'

export const postRoute = new Elysia({ prefix: '/post' })
  .use(base)
  .use(postDto)

  // public routes

  .get('/getAll', async ({ store: { db } }) => {
    return await db.post.findMany({ include: { author: true }, orderBy: { createdAt: 'desc' } })
  })

  // protected routes
  .onBeforeHandle(authMiddleware)

  .post(
    '/create',
    async ({ store: { db, user }, body: { content } }) => {
      const newPost = await db.post.create({ data: { content, author: { connect: { id: user.id } } } })
      if (!newPost) throw new Error('Post not created')
      return { message: 'Post created' }
    },
    { body: 'create' },
  )

  .delete(
    '/delete',
    async ({ body: { id }, store: { user, db } }) => {
      const post = await db.post.findUnique({ where: { id } })
      if (!post) throw new Error('Post not found')
      if (post.authorId !== user.id) throw new Error('You are not the author of this post')
      await db.post.delete({ where: { id } })
      return { message: 'Post deleted' }
    },
    { body: 'delete' },
  )
