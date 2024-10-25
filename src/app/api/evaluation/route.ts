import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma-client'
import { DNEvaluation } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const body: Omit<DNEvaluation, 'id' | 'createdAt' | 'overallScore'> = await request.json()
    
    // Calculate overallScore
    const overallScore = Math.round(
      (body.memorabilityScore + body.pronounceabilityScore + body.brandabilityScore) / 3
    )

    const evaluation = await prisma.dNEvaluation.create({
      data: {
        domainId: body.domainId,
        possibleCategories: body.possibleCategories,
        possibleKeywords: body.possibleKeywords,
        memorabilityScore: body.memorabilityScore,
        pronounceabilityScore: body.pronounceabilityScore,
        brandabilityScore: body.brandabilityScore,
        // Take overallScore from the calculation
        overallScore: overallScore,
        description: body.description,
        processedByAgent: body.processedByAgent,
        agentModel: body.agentModel
      }
    })
    return NextResponse.json(evaluation)
  } catch (error) {
    console.error('Error creating evaluation:', error)
    return NextResponse.json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}
