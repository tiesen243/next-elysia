import bcrypt from 'bcryptjs'

import db from '@/prisma'
import type { SignupDto, SigninDto } from '@/server/models/user.model'

export default class UserService {
  async getUsers() {
    const users = await db.user.findMany()
    if (!users || users.length === 0) throw new Error('No user found')
    return users
  }

  async getUser(id: string) {
    const user = await db.user.findUnique({ where: { id } })
    if (!user) throw new Error('User not found')
    return user
  }

  async signup({ name, email, password }: SignupDto) {
    const isEmailExist = await db.user.findUnique({ where: { email } })
    if (isEmailExist) throw new Error('Email already exist')

    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = await db.user.create({ data: { name, email, password: passwordHash } })
    if (!newUser) throw new Error('Failed to create user')

    return newUser
  }

  async signin({ email, password }: SigninDto) {
    const user = await db.user.findUnique({ where: { email } })
    if (!user) throw new Error('User not found')

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) throw new Error('Password is incorrect')

    return user
  }
}
