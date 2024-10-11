import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample domain names
  const domain1 = await prisma.domainName.create({
    data: {
      domainName: 'example.com',
      tld: 'com',
      length: 11,
      processedByAgent: 'SeedScript',
      agentModel: 'Manual',
      evaluation: {
        create: {
          possibleCategories: ['Technology', 'Business'],
          possibleKeywords: ['example', 'demo', 'sample'],
          memorabilityScore: 8,
          pronounceabilityScore: 9,
          brandabilityScore: 7,
          description: 'A simple, memorable domain name suitable for various purposes.',
          overallScore: 8,
          processedByAgent: 'SeedScript',
          agentModel: 'Manual',
        },
      },
      seoAnalysis: {
        create: {
          seoKeywords: ['example', 'demo', 'sample'],
          seoKeywordRelevanceScore: 7,
          industryRelevanceScore: 6,
          domainAge: 20,
          potentialResaleValue: 5000,
          language: 'English',
          trademarkStatus: 'Not Trademarked',
          scoredByAgent: 'SeedScript',
          agentModel: 'Manual',
          description: 'A generic domain with moderate SEO potential.',
        },
      },
      availabilityStatus: {
        create: {
          status: 'Registered',
          processedByAgent: 'SeedScript',
          agentModel: 'Manual',
        },
      },
    },
  })

  const domain2 = await prisma.domainName.create({
    data: {
      domainName: 'techstart.io',
      tld: 'io',
      length: 12,
      processedByAgent: 'SeedScript',
      agentModel: 'Manual',
      evaluation: {
        create: {
          possibleCategories: ['Technology', 'Startup'],
          possibleKeywords: ['tech', 'start', 'innovation'],
          memorabilityScore: 9,
          pronounceabilityScore: 8,
          brandabilityScore: 9,
          description: 'A catchy domain name perfect for tech startups.',
          overallScore: 9,
          processedByAgent: 'SeedScript',
          agentModel: 'Manual',
        },
      },
      seoAnalysis: {
        create: {
          seoKeywords: ['tech', 'startup', 'innovation'],
          seoKeywordRelevanceScore: 9,
          industryRelevanceScore: 8,
          domainAge: 5,
          potentialResaleValue: 10000,
          language: 'English',
          trademarkStatus: 'Trademarked',
          scoredByAgent: 'SeedScript',
          agentModel: 'Manual',
          description: 'A modern domain with high SEO potential for tech startups.',
        },
      },
      availabilityStatus: {
        create: {
          status: 'Available',
          processedByAgent: 'SeedScript',
          agentModel: 'Manual',
        },
      },
    },
  })

  console.log({ domain1, domain2 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })