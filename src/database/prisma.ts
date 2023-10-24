import { PrismaClient } from '@prisma/client'

// Create Prisma instance

const prisma = new PrismaClient({
  errorFormat: 'minimal',
})

// Export Prisma instance

export default prisma
