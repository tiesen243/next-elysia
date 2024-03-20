import { Elysia, t, type UnwrapSchema } from 'elysia'

const signup = t.Object({
  name: t.String({ minLength: 4 }),
  email: t.String({ format: 'email', title: 'dasdasdsad' }),
  password: t.RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    error:
      'Password must contain at least 8 characters, including at least one letter and one number and special character',
  }),
})
export type SignupDto = UnwrapSchema<typeof signup>

const signin = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 8 }),
})
export type SigninDto = UnwrapSchema<typeof signin>

const userDto = new Elysia({ name: 'userDto' }).model({ signup, signin })

export default userDto
