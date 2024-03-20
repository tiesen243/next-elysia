import { Elysia } from 'elysia'
import bcrypt from 'bcryptjs'

import userDto from '@/server/dto/user.dto'
import { base } from '@/server/plugin'

export const userRoute = new Elysia({ name: 'User', prefix: '/user' })
  .use(base)
  .use(userDto)

  .get(
    '/getById/:id',
    async ({ store: { db }, params: { id } }) => {
      const user = await db.user.findUnique({ where: { id } })
      if (!user) throw new Error('User not found')
      return user
    },
    { detail: { tags: ['User'] } },
  )

  .post(
    '/signup',
    async ({ store: { db }, body: { name, email, password } }) => {
      const isEmailExist = await db.user.findUnique({ where: { email } })
      if (isEmailExist) throw new Error('Email already exist')

      const passwordHash = await bcrypt.hash(password, 10)
      const newUser = await db.user.create({ data: { name, email, password: passwordHash } })
      if (!newUser) throw new Error('Failed to create user')

      return newUser
    },
    { body: 'signup', detail: { tags: ['User'] } },
  )

  .post(
    '/signin',
    async ({ store: { db }, body: { email, password } }) => {
      const user = await db.user.findUnique({ where: { email } })
      if (!user) throw new Error('User not found')

      const isPasswordMatch = await bcrypt.compare(password, user.password)
      if (!isPasswordMatch) throw new Error('Password not match')

      return user
    },
    { body: 'signin', detail: { tags: ['User'] } },
  )
