'use server';

import prisma from '@/lib/prisma';

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
  const skip = (page - 1) * pageSize;

  const where = {
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { tld: { contains: search, mode: 'insensitive' } },
        { possibleCategories: { has: search } },
        { possibleKeywords: { has: search } },
      ],
    }),
    ...(status && { availabilityStatus: status }),
    ...(tld && { tld }),
    ...(bot && { generatedByBot: bot }),
    ...(industry && { possibleCategories: { has: industry } }),
  };

  const [domains, totalCount] = await Promise.all([
    prisma.domain.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: sortBy ? { [sortBy]: sortOrder || 'asc' } : undefined,
    }),
    prisma.domain.count({ where }),
  ]);

  return { domains, totalCount };
}