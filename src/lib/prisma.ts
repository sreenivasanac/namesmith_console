import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      // Log the SQL queries executed by Prisma during development
      // TODO remove this on November 1st, 2024 after demo
      log: ['query'],
    })
  }
  prisma = global.prisma
}

export default prisma