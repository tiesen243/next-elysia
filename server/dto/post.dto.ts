import { Elysia, t, type UnwrapSchema } from 'elysia'

const createPost = t.Object({ content: t.String({ minLength: 4 }) })
export type CreatePostDto = UnwrapSchema<typeof createPost>

const deletePost = t.Object({ id: t.String() })
export type DeletePostDto = UnwrapSchema<typeof deletePost>

const postDto = new Elysia({ name: 'Model.Post' }).model({ createPost, deletePost })

export default postDto
