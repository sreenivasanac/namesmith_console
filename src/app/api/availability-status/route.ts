import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma-client'
import { DNAvailabilityStatus } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const { domainName, ...bodyData } = await request.json()
    const body: Omit<DNAvailabilityStatus, 'id' | 'createdAt' | 'domainName'> = bodyData

    const status = await prisma.dNAvailabilityStatus.create({
      data: {
        ...body,
        // domainName: {
        //     connect: { domainName: domainName }
        // },
        relatedDomain: {
          connect: { domainName: domainName }
        }
      }
    })
    return NextResponse.json(status)
  } catch (error) {
    console.error('Error creating availability status:', error)
    return NextResponse.json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}
