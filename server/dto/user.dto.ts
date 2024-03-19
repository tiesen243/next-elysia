import { Elysia, t } from 'elysia'

const userDto = new Elysia({ name: 'userDto' }).model({
  signup: t.Object({
    name: t.String({ minLength: 4, error: 'Name must be at least 4 characters' }),
    email: t.String({ format: 'email', error: 'Invalid email' }),
    password: t.String({ minLength: 8, error: 'Password must be at least 8 characters' }),
  }),
  signin: t.Object({
    email: t.String({ format: 'email' }),
    password: t.String({ minLength: 8 }),
  }),
})

export default userDto
