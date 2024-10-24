import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { DomainWithDetails } from "@/types/domain"

interface DomainDetailsProps {
  domain: DomainWithDetails
  onClose: () => void
}

export function DomainDetailsSheet({ domain, onClose }: DomainDetailsProps) {
  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Domain Details</SheetTitle>
          <SheetDescription>
            Detailed information about the domain {domain.domainName}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <section>
            <h3 className="text-lg font-semibold">Domain Information</h3>
            <p>TLD: {domain.tld}</p>
            <p>Length: {domain.length}</p>
            <p>Created At: {domain.createdAt.toLocaleString()}</p>
            <p>Processed By Agent: {domain.processedByAgent}</p>
            <p>Agent Model: {domain.agentModel}</p>
          </section>

          {domain.availabilityStatus && (
            <section>
              <h3 className="text-lg font-semibold">Availability Status</h3>
              <p>Status: {domain.availabilityStatus.status}</p>
              <p>Processed By Agent: {domain.availabilityStatus.processedByAgent}</p>
              <p>Agent Model: {domain.availabilityStatus.agentModel}</p>
              <p>Created At: {domain.availabilityStatus.createdAt.toLocaleString()}</p>
            </section>
          )}

          {domain.evaluation && (
            <section>
              <h3 className="text-lg font-semibold">Evaluation</h3>
              <p>Possible Categories: {domain.evaluation.possibleCategories.join(", ")}</p>
              <p>Possible Keywords: {domain.evaluation.possibleKeywords.join(", ")}</p>
              <p>Memorability Score: {domain.evaluation.memorabilityScore}</p>
              <p>Pronounceability Score: {domain.evaluation.pronounceabilityScore}</p>
              <p>Brandability Score: {domain.evaluation.brandabilityScore}</p>
              <p>Overall Score: {domain.evaluation.overallScore}</p>
              <p>Description: {domain.evaluation.description}</p>
              <p>Processed By Agent: {domain.evaluation.processedByAgent}</p>
              <p>Agent Model: {domain.evaluation.agentModel}</p>
              <p>Created At: {domain.evaluation.createdAt.toLocaleString()}</p>
            </section>
          )}

          {domain.seoAnalysis && (
            <section>
              <h3 className="text-lg font-semibold">SEO Analysis</h3>
              <p>SEO Keywords: {domain.seoAnalysis.seoKeywords.join(", ")}</p>
              <p>SEO Keyword Relevance Score: {domain.seoAnalysis.seoKeywordRelevanceScore}</p>
              <p>Industry Relevance Score: {domain.seoAnalysis.industryRelevanceScore}</p>
              <p>Domain Age: {domain.seoAnalysis.domainAge}</p>
              <p>Potential Resale Value: {domain.seoAnalysis.potentialResaleValue}</p>
              <p>Language: {domain.seoAnalysis.language}</p>
              <p>Trademark Status: {domain.seoAnalysis.trademarkStatus || "N/A"}</p>
              <p>Scored By Agent: {domain.seoAnalysis.scoredByAgent}</p>
              <p>Agent Model: {domain.seoAnalysis.agentModel}</p>
              <p>Description: {domain.seoAnalysis.description}</p>
              <p>Created At: {domain.seoAnalysis.createdAt.toLocaleString()}</p>
            </section>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
