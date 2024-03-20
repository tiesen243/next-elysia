import { Elysia, t, type UnwrapSchema } from 'elysia'

const createPost = t.Object({ content: t.String({ minLength: 4, error: 'Content must be at least 4 characters' }) })
export type CreatePostDto = UnwrapSchema<typeof createPost>

const postDto = new Elysia({ name: 'Model.Post' }).model({ createPost })

export default postDto
