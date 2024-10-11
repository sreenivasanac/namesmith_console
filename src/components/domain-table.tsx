import { DomainName, DNAvailabilityStatus, DNEvaluation, DNSEOAnalysis } from '@prisma/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

type DomainWithRelations = DomainName & {
  availabilityStatus: DNAvailabilityStatus | null;
  evaluation: DNEvaluation | null;
  seoAnalysis: DNSEOAnalysis | null;
};

interface DomainTableProps {
  domains: DomainWithRelations[];
}

export function DomainTable({ domains }: DomainTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Domain Name</TableHead>
          <TableHead>More Info</TableHead>
          <TableHead>Availability Status</TableHead>
          <TableHead>Evaluation</TableHead>
          <TableHead>SEO Analysis</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {domains && domains.length > 0 ? (
          domains.map((domain) => (
            <TableRow key={domain.id}>
              <TableCell>{domain.domainName}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  More Info
                </Button>
              </TableCell>
              <TableCell>{domain.availabilityStatus?.status ?? 'N/A'}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!domain.evaluation}
                >
                  View Evaluation
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!domain.seoAnalysis}
                >
                  View SEO Analysis
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No domains found.
              {/* TODO add a button to generate domains */}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}