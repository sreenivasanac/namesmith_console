import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// Declare a variable to hold the Prisma instance
let prisma: PrismaClient

// Check if we're running in production
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // In development, use a global variable to prevent multiple instances
  if (!(global as unknown as { prisma?: PrismaClient }).prisma) {
    (global as unknown as { prisma?: PrismaClient }).prisma = new PrismaClient()
  }
  prisma = (global as unknown as { prisma: PrismaClient }).prisma
}

export async function GET() {
  try {
    const domains = await prisma.domainName.findMany({
      include: {
        availabilityStatus: true,
        evaluation: true,
        seoAnalysis: true,
      },
    })
    return NextResponse.json(domains)
  } catch (error) {
    console.error('Error fetching domains:', error)
    return NextResponse.json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}
