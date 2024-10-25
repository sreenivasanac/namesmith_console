import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma-client'
import { DNSEOAnalysis } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const body: Omit<DNSEOAnalysis, 'id' | 'createdAt'> = await request.json()
    const seoAnalysis = await prisma.dNSEOAnalysis.create({
      data: body,
    })
    return NextResponse.json(seoAnalysis)
  } catch (error) {
    console.error('Error creating SEO analysis:', error)
    return NextResponse.json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }, { status: 500 })
  }
}
