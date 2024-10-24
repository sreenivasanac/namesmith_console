import { DomainName as PrismaDomainName, DNAvailabilityStatus, DNEvaluation, DNSEOAnalysis } from "@prisma/client"

export interface DomainWithDetails extends PrismaDomainName {
  availabilityStatus: DNAvailabilityStatus | null
  evaluation: DNEvaluation | null
  seoAnalysis: DNSEOAnalysis | null
}

export interface RangeFilter {
  min: number
  max: number
}

export interface Filters {
  search: string
  status: string[]
  tld: string[]
  bot: string[]
  industry: string[]
  memorabilityScore?: RangeFilter
  pronounceabilityScore?: RangeFilter
  brandabilityScore?: RangeFilter
  overallScore?: RangeFilter
  seoKeywordRelevanceScore?: RangeFilter
}

export type { PrismaDomainName as DomainName, DNAvailabilityStatus, DNEvaluation, DNSEOAnalysis }
