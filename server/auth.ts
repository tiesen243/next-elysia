import type { User } from '@prisma/client'
import NextAuth, { type DefaultSession, type NextAuthConfig } from 'next-auth'
import 'next-auth/jwt'
import credentials from 'next-auth/providers/credentials'

import { api } from '@/lib/api'

declare module 'next-auth' {
  interface Session {
    user: User & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User
  }
}

const authOptions = {
  providers: [
    credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) return null
        const { data, error } = await api.user.signin.post({
          email: String(credentials.email),
          password: String(credentials.password),
        })

        if (error)
          throw new Error(error.value.message, {
            cause: error.value,
          })

        return data
      },
    }),
  ],
  trustHost: true,
  session: { strategy: 'jwt' },
  pages: { signIn: '/signin', error: '/signin' },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.user = user as User

      // Fetch new user data
      const { data, error } = await api.user.getById({ id: token.user.id }).get()
      if (error) throw new Error(error.value.message)
      if (token.user.id) token.user = data

      return token
    },
    session: async ({ session, token }) => {
      if (token) session.user = token.user as any
      return session
    },
  },
} satisfies NextAuthConfig

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions)
