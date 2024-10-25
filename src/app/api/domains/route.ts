import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma-client'
import { DomainName } from '@prisma/client'

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

export async function POST(request: Request) {
  try {
    const body: Omit<DomainName, 'id' | 'createdAt'> = await request.json()
    const domain = await prisma.domainName.create({
      data: body,
      include: {
        availabilityStatus: true,
        evaluation: true,
        seoAnalysis: true,
      },
    })
    return NextResponse.json(domain)
  } catch (error) {
    console.error('Error creating domain:', error)
    return NextResponse.json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}
