import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const domains = await prisma.domainName.findMany({
    include: {
      availabilityStatus: true,
      evaluation: true,
      seoAnalysis: true,
    },
  })

  return new Response(JSON.stringify(domains))
}
