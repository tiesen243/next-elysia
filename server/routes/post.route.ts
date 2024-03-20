import { Elysia } from 'elysia'

import postDto from '@/server/dto/post.dto'
import { authMiddleware, base } from '@/server/plugin'

export const postRoute = new Elysia({ name: 'Post', prefix: '/post' })
  .use(base)
  .use(postDto)

  // public routes

  .get(
    '/getAll',
    async ({ store: { db } }) => db.post.findMany({ include: { author: true }, orderBy: { createdAt: 'desc' } }),
    { detail: { tags: ['Post'] } },
  )

  // protected routes
  .use(authMiddleware)

  .post(
    '/create',
    async ({ user, store: { db }, body: { content } }) => {
      const newPost = await db.post.create({ data: { content, author: { connect: { id: user.id } } } })
      if (!newPost) throw new Error('Post not created')
      return { message: 'Post created' }
    },
    { body: 'createPost', detail: { tags: ['Post'] } },
  )

  .delete(
    '/delete/:id',
    async ({ params: { id }, store: { db }, user }) => {
      const post = await db.post.findUnique({ where: { id } })
      if (!post) throw new Error('Post not found')
      if (post.authorId !== user.id) throw new Error('You are not the author of this post')
      await db.post.delete({ where: { id } })
      return { message: 'Post deleted' }
    },
    { detail: { tags: ['Post'] } },
  )
