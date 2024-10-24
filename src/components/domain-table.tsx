"use client"

import * as React from "react"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSearchParams } from 'next/navigation'
import { DomainDetailsSheet } from "@/components/domain-details-sheet"
import { DomainWithDetails } from "@/types/domain"

interface DomainTableProps {
  domains: DomainWithDetails[]
}

export function DomainTable({ domains }: DomainTableProps) {
  const [sortColumn, setSortColumn] = React.useState<keyof DomainWithDetails | null>(null)
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = React.useState("")
  const searchParams = useSearchParams()
  const [selectedDomain, setSelectedDomain] = React.useState<DomainWithDetails | null>(null)

  const filteredDomains = React.useMemo(() => {
    let result = [...domains]

    // Apply URL filters
    const urlSearch = searchParams.get('search')
    const urlStatus = searchParams.get('status')?.split(',')
    const urlTld = searchParams.get('tld')?.split(',')
    const urlBot = searchParams.get('bot')?.split(',')
    const urlIndustry = searchParams.get('industry')?.split(',')

    if (urlSearch) {
      console.log('urlSearch')
      console.log(urlSearch)
      result = result.filter(domain => {
        const lowerDomainName = domain.domainName.toLowerCase()
        console.log(`Domain: ${domain.domainName}, Lowercase:`, lowerDomainName)
        return lowerDomainName.includes(urlSearch.toLowerCase())
      })
    }
    if (urlStatus) {
      console.log('urlStatus')
      console.log(urlStatus)
      result = result.filter(domain => {
        console.log(`Domain: ${domain.domainName}, Status:`, domain.availabilityStatus?.status)
        return urlStatus.includes(domain.availabilityStatus?.status || '')
      })
    }
    if (urlTld) {
      console.log('urlTld')
      console.log(urlTld)
      result = result.filter(domain => {
        console.log(`Domain: ${domain.domainName}, TLD:`, domain.tld)
        return urlTld.includes(domain.tld)
      })
    }
    if (urlBot) {
      console.log('urlBot')
      console.log(urlBot)
      result = result.filter(domain => {
        console.log(`Domain: ${domain.domainName}, ProcessedByAgent:`, domain.processedByAgent)
        return urlBot.includes(domain.processedByAgent)
      })
    }
    if (urlIndustry) {
      console.log('urlIndustry')
      console.log(urlIndustry)
      result = result.filter(domain => {
        console.log(`Domain: ${domain.domainName}, Categories:`, domain.evaluation?.possibleCategories)
        return domain.evaluation?.possibleCategories.some(category => urlIndustry.includes(category))
      })
    }

    // Apply table search
    if (searchTerm) {
      console.log('searchTerm')
      console.log(searchTerm)
      result = result.filter(domain => 
        domain.domainName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply sorting
    if (sortColumn) {
      result.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue === undefined || bValue === undefined) return 0;
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [domains, searchParams, searchTerm, sortColumn, sortDirection]);

  const handleSort = (column: keyof DomainWithDetails) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter domains..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('domainName')}>
                  Domain Name
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('tld')}>
                  TLD
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('length')}>
                  Length
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('processedByAgent')}>
                  Bot
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDomains.map((domain) => (
              <TableRow key={domain.id}>
                <TableCell>{domain.domainName}</TableCell>
                <TableCell>{domain.tld}</TableCell>
                <TableCell>{domain.length}</TableCell>
                <TableCell>{domain.processedByAgent}</TableCell>
                <TableCell>{domain.availabilityStatus?.status || 'N/A'}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <DotsHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => navigator.clipboard.writeText(domain.domainName)}>
                        Copy domain name
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setSelectedDomain(domain)}>
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedDomain && (
        <DomainDetailsSheet
          domain={selectedDomain}
          onClose={() => setSelectedDomain(null)}
        />
      )}
    </div>
  )
}
