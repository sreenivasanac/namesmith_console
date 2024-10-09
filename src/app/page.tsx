import { PrismaClient } from '@prisma/client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const prisma = new PrismaClient()

async function getDomains() {
  try {
    return await prisma.domain_names_basic_info.findMany()
  } catch (error) {
    console.error("Error fetching domains:", error)
    return []
  }
}

export default async function Home() {
  const domains = await getDomains()

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Domain Information</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Domain Name</TableHead>
            <TableHead>Date of Creation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {domains.map((domain) => (
            <TableRow key={domain.id}>
              <TableCell>{domain.name}</TableCell>
              <TableCell>{domain.creationDate.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
