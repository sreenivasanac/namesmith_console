import { DomainName as PrismaDomainName, DNAvailabilityStatus, DNEvaluation, DNSEOAnalysis } from "@prisma/client"

export interface DomainWithDetails extends PrismaDomainName {
  availabilityStatus: DNAvailabilityStatus | null
  evaluation: DNEvaluation | null
  seoAnalysis: DNSEOAnalysis | null
}

export type { PrismaDomainName as DomainName, DNAvailabilityStatus, DNEvaluation, DNSEOAnalysis }
