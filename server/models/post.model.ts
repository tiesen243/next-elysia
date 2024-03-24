import { Elysia, t, type UnwrapSchema } from 'elysia'

const createPost = t.Object({ content: t.String({ minLength: 4, error: 'Content must be at least 4 characters' }) })
export type CreatePostDto = UnwrapSchema<typeof createPost>

const deletePost = t.Object({ id: t.String() })
export type DeletePostDto = UnwrapSchema<typeof deletePost>

const PostModel = new Elysia({ name: 'Model.Post' }).model({ createPost, deletePost })

export default PostModel
