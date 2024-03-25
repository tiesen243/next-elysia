import { Elysia, t, type UnwrapSchema } from 'elysia'

const getPosts = t.Object({
  page: t.Optional(t.Numeric({ minimum: 1, default: 1, error: 'Page must be at least 1' })),
  limit: t.Optional(t.Numeric({ minimum: 1, error: 'Limit must be at least 1' })),
})
export type GetPostsDto = UnwrapSchema<typeof getPosts>

const createPost = t.Object({ content: t.String({ minLength: 4, error: 'Content must be at least 4 characters' }) })
export type CreatePostDto = UnwrapSchema<typeof createPost>

const deletePost = t.Object({ id: t.String() })
export type DeletePostDto = UnwrapSchema<typeof deletePost>

const PostModel = new Elysia({ name: 'Model.Post' }).model({ getPosts, createPost, deletePost })

export default PostModel
