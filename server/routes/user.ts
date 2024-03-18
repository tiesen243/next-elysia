import { Elysia } from 'elysia'
import bcrypt from 'bcryptjs'

import userDto from '@/server/dto/user.dto'

export const userRoute = new Elysia({ prefix: '/user' })
  .use(userDto)

  .post(
    '/signup',
    async ({ store: { db }, body: { name, email, password } }) => {
      const isEmailExist = await db.user.findUnique({ where: { email } })
      if (isEmailExist) throw 'Email already exist'

      const passwordHash = await bcrypt.hash(password, 10)
      const newUser = await db.user.create({ data: { name, email, password: passwordHash } })
      if (!newUser) throw 'Failed to create user'

      return newUser
    },
    { body: 'signup' },
  )

  .post(
    '/signin',
    async ({ store: { db }, body: { email, password } }) => {
      const user = await db.user.findUnique({ where: { email } })
      if (!user) throw new Error('Email not found')

      const isPasswordMatch = await bcrypt.compare(password, user.password)
      if (!isPasswordMatch) throw new Error('Password not match')

      return user
    },
    { body: 'signin' },
  )
