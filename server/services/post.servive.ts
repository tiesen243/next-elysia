import type { User } from 'next-auth'
import { error } from 'elysia'

import db from '@/prisma'
import type { CreatePostDto } from '@/server/models/post.model'

export default class PostService {
  async getPosts() {
    const posts = await db.post.findMany({
      include: { author: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    })
    if (!posts || posts.length === 0) return error('Not Found', { message: 'No posts found' })
    return posts
  }

  async createPost({ content }: CreatePostDto, user: User) {
    const newPost = await db.post.create({ data: { content, author: { connect: { id: user.id } } } })
    if (!newPost) return error('Internal Server Error', { message: 'Post not created' })
    return { message: 'Post created' }
  }

  async deletePost(id: string, user: User) {
    const post = await db.post.findUnique({ where: { id } })
    if (!post) return error('Not Found', { message: 'Post not found' })

    if (post.authorId !== user.id)
      return error('Unauthorized', { message: 'You are not authorized to delete this post' })

    await db.post.delete({ where: { id } })
    return { message: 'Post deleted' }
  }
}
