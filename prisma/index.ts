import { PrismaClient } from '@prisma/client'

const prisma = () =>
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

const globalForPrisma = globalThis as any as {
  prisma: ReturnType<typeof prisma> | undefined
}

const db = globalForPrisma.prisma || prisma()
export default db

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
