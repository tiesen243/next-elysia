import bcrypt from 'bcryptjs'
import { error } from 'elysia'

import db from '@/prisma'
import type { SigninDto, SignupDto } from '@/server/models/user.model'

export default class UserService {
  async getUsers() {
    const users = await db.user.findMany()
    if (!users || users.length === 0) return error('Not Found', { message: 'Users not found' })
    return users
  }

  async getUser(id: string) {
    const user = await db.user.findUnique({ where: { id } })
    if (!user) return error('Not Found', { message: 'User not found' })
    return user
  }

  async signup({ name, email, password }: SignupDto) {
    const isEmailExist = await db.user.findUnique({ where: { email } })
    if (isEmailExist) return error('Conflict', { message: 'User already exists' })

    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = await db.user.create({ data: { name, email, password: passwordHash } })
    if (!newUser) return error('Internal Server Error', { message: 'User not created' })

    return newUser
  }

  async signin({ email, password }: SigninDto) {
    const user = await db.user.findUnique({ where: { email } })
    if (!user) return error('Not Found', { message: 'User not found' })

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) return error('Unauthorized', { message: 'Password is incorrect' })

    return user
  }

  async deleteUser(id: string) {
    const user = await db.user.delete({ where: { id } })
    if (!user) return error('Internal Server Error', { message: 'User not deleted' })
    return user
  }
}
