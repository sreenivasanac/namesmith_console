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
import { useFilterStore } from "@/store/filterStore"
import { DomainName } from "@prisma/client"
import { useSearchParams } from 'next/navigation'

interface DomainTableProps {
  domains: DomainName[]
}

export function DomainTable({ domains }: DomainTableProps) {
  const [sortColumn, setSortColumn] = React.useState<keyof DomainName | null>(null)
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = React.useState("")
  const searchParams = useSearchParams()

  const filteredDomains = React.useMemo(() => {
    let result = [...domains]

    // Apply URL filters
    const urlSearch = searchParams.get('search')
    const urlStatus = searchParams.get('status')?.split(',')
    const urlTld = searchParams.get('tld')?.split(',')
    const urlBot = searchParams.get('bot')?.split(',')
    const urlIndustry = searchParams.get('industry')?.split(',')

    if (urlSearch) {
      result = result.filter(domain =>
        domain.domainName.toLowerCase().includes(urlSearch.toLowerCase())
      )
    }
    if (urlStatus) {
      result = result.filter(domain => urlStatus.includes(domain.availabilityStatus?.status || ''))
    }
    if (urlTld) {
      result = result.filter(domain => urlTld.includes(domain.tld))
    }
    if (urlBot) {
      result = result.filter(domain => urlBot.includes(domain.processedByAgent))
    }
    if (urlIndustry) {
      result = result.filter(domain =>
        domain.evaluation?.possibleCategories.some(category => urlIndustry.includes(category))
      )
    }

    // Apply table search
    if (searchTerm) {
      result = result.filter(domain => 
        domain.domainName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply sorting
    if (sortColumn) {
      result.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [domains, searchParams, searchTerm, sortColumn, sortDirection])

  const handleSort = (column: keyof DomainName) => {
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
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
