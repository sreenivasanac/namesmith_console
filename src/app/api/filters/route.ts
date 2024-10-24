import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const statuses = await prisma.dNAvailabilityStatus.findMany({
    select: { status: true },
    distinct: ['status']
  })

  const tlds = await prisma.domainName.findMany({
    select: { tld: true },
    distinct: ['tld']
  })

  const bots = await prisma.domainName.findMany({
    select: { agentModel: true },
    distinct: ['agentModel']
  })

  const industries = await prisma.dNEvaluation.findMany({
    select: { possibleCategories: true }
  })

  const uniqueIndustries = [...new Set(industries.flatMap((i: { possibleCategories: string[] }) => i.possibleCategories))]

  return NextResponse.json({
    statuses: statuses.map((s: { status: string }) => s.status),
    tlds: tlds.map((t: { tld: string }) => t.tld),
    bots: bots.map((b: { agentModel: string }) => b.agentModel),
    industries: uniqueIndustries
  })
}
