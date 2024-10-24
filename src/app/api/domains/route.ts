import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma-client'

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
