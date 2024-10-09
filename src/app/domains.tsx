import prisma from '@/lib/prisma'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

async function getDomains() {
  try {
    console.log("Attempting to fetch domains...")
    const domains = await prisma.domainName.findMany()
    console.log("Domains fetched successfully:", domains)
    return domains
  } catch (error) {
    console.error("Error fetching domains:", error)
    return []
  }
}

export default async function Domains() {
  const domains = await getDomains()

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Domain Information</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Domain Name</TableHead>
            <TableHead>TLD</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {domains.map((domain: any) => (
            <TableRow key={domain.id}>
              <TableCell>{domain.domainName}</TableCell>
              <TableCell>{domain.tld}</TableCell>
              <TableCell>{new Date(domain.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}