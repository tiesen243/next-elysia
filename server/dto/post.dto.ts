import { Elysia, t } from 'elysia'

const postDto = new Elysia({ name: 'Model.Post' }).model({
  getById: t.Object({
    id: t.String({ format: 'uuid' }),
  }),
  create: t.Object({
    title: t.String({ minLength: 4 }),
    content: t.String({ minLength: 4 }),
  }),
  update: t.Object({
    id: t.String({ format: 'uuid' }),
    title: t.String({ minLength: 4 }),
    content: t.String({ minLength: 4 }),
  }),
  delete: t.Object({
    id: t.String({ format: 'uuid' }),
  }),
})

export default postDto
