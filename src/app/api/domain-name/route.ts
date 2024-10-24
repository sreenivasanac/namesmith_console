import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma-client'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const domain = await prisma.domainName.create({
      data: body
    })
    return NextResponse.json(domain)
  } catch (error) {
    console.error('Error creating domain:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
