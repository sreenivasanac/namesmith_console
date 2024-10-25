import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma-client'
import { DNEvaluation } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const { domainName, domainId, ...bodyData } = await request.json()
    const body: Omit<DNEvaluation, 'id' | 'createdAt' | 'overallScore' | 'domainName'> = bodyData
    
    const overallScore = Math.round(
      (body.memorabilityScore + body.pronounceabilityScore + body.brandabilityScore) / 3
    )

    const evaluation = await prisma.dNEvaluation.create({
      data: {
        ...body,
        overallScore,
        domainId: domainId,
        // domainName: {
        //     connect: { domainName: domainName }
        // },
        // relatedDomain: {
        //   connect: { domainName: domainName }
        // }
      }
    })
    return NextResponse.json(evaluation)
  } catch (error) {
    console.error('Error creating evaluation:', error)
    return NextResponse.json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}
