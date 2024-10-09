'use server';

import { prisma } from '@/lib/prisma';

interface FetchDomainsParams {
  page: number;
  pageSize: number;
  search?: string;
  status?: string;
  tld?: string;
  bot?: string;
  industry?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function fetchDomains({
  page,
  pageSize,
  search,
  status,
  tld,
  bot,
  industry,
  sortBy,
  sortOrder,
}: FetchDomainsParams) {
  try {
    const skip = (page - 1) * pageSize;

    const where = {
      ...(search && {
        OR: [
          { domainName: { contains: search, mode: 'insensitive' } },
          { tld: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(status && { availabilityStatus: { status } }),
      ...(tld && { tld }),
      ...(bot && { processedByAgent: bot }),
      ...(industry && { evaluation: { possibleCategories: { has: industry } } }),
    };

    const [domains, totalCount] = await Promise.all([
      prisma.domainName.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: sortBy ? { [sortBy]: sortOrder || 'asc' } : undefined,
        include: {
          availabilityStatus: true,
          evaluation: true,
          seoAnalysis: true,
        },
      }),
      prisma.domainName.count({ where }),
    ]);

    return { domains, totalCount };
  } catch (error) {
    console.error('Error in fetchDomains:', error);
    throw error;
  }
}