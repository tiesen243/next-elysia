import type { User } from 'next-auth'

import db from '@/prisma'
import type { CreatePostDto } from '@/server/models/post.model'

export default class PostService {
  async getPosts() {
    const posts = await db.post.findMany({ include: { author: true }, orderBy: { createdAt: 'desc' } })
    if (!posts || posts.length === 0) throw new Error('Posts not found')
    return posts
  }

  async createPost({ content }: CreatePostDto, user: User) {
    const newPost = await db.post.create({ data: { content, author: { connect: { id: user.id } } } })
    if (!newPost) throw new Error('Post not created')
    return { message: 'Post created' }
  }

  async deletePost(id: string, user: User) {
    const post = await db.post.findUnique({ where: { id } })
    if (!post) throw new Error('Post not found')

    if (post.authorId !== user.id) throw new Error('You are not the author of this post')

    await db.post.delete({ where: { id } })
    return { message: 'Post deleted' }
  }
}
