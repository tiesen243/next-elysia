import { Elysia, t } from 'elysia'

const userDto = new Elysia({ name: 'userDto' }).model({
  signup: t.Object({
    name: t.String({ required: true }),
    email: t.String({ format: 'email' }),
    password: t.String({ minLength: 8 }),
  }),
  signin: t.Object({
    email: t.String({ format: 'email' }),
    password: t.String({ minLength: 8 }),
  }),
})

export default userDto
