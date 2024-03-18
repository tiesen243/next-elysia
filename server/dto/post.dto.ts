import db from '@/prisma'
import { Elysia, t } from 'elysia'

const postDto = new Elysia({ name: 'Model.Post' }).state({ db }).model({
  create: t.Object({ content: t.String({ minLength: 4 }) }),
  delete: t.Object({ id: t.String() }),
})

export default postDto
