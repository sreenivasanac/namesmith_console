'use server';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface FetchDomainsParams {
  search?: string;
  status?: string;
  tld?: string;
  bot?: string;
  industry?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function fetchDomains({
  search,
  status,
  tld,
  bot,
  industry,
  sortBy,
  sortOrder,
}: FetchDomainsParams) {
  try {
    const where: Prisma.DomainNameWhereInput = {};
    if (search) {
      where.domainName = { contains: search, mode: 'insensitive' };
    }
    if (status) {
      where.availabilityStatus = { status: { in: status.split(',') } };
    }
    if (tld) {
      where.tld = { in: tld.split(',') };
    }
    if (bot) {
      where.processedByAgent = { in: bot.split(',') };
    }
    if (industry) {
      where.evaluation = { possibleCategories: { hasSome: industry.split(',') } };
    }

    const orderBy: Prisma.DomainNameOrderByWithRelationInput = {};
    if (sortBy) {
      orderBy[sortBy as keyof Prisma.DomainNameOrderByWithRelationInput] = sortOrder || 'asc';
    }

    const domains = await prisma.domainName.findMany({
      where,
      orderBy,
      include: {
        availabilityStatus: true,
        evaluation: true,
        seoAnalysis: true,
      },
    });

    return { domains };
  } catch (error) {
    console.error('Error in fetchDomains:', error);
    throw error;
  }
}