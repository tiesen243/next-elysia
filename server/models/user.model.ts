import { Elysia, t, type UnwrapSchema } from 'elysia'

const signup = t.Object({
  name: t.String({ minLength: 4, error: 'Name must be at least 4 characters' }),
  email: t.String({ format: 'email', error: 'Invalid email' }),
  password: t.RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    minLength: 8,
    error:
      'Password must contain at least 8 characters, including at least one letter and one number and special character',
  }),
})
export type SignupDto = UnwrapSchema<typeof signup>

const signin = t.Object({
  email: t.String({ format: 'email', error: 'Invalid email' }),
  password: t.String({ minLength: 8, error: 'Password must be at least 8 characters' }),
})
export type SigninDto = UnwrapSchema<typeof signin>

const UserModel = new Elysia({ name: 'Model.User' }).model({ signup, signin })

export default UserModel
