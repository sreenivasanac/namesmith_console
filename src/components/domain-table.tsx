"use client"

import * as React from "react"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
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
import { Filters, DNEvaluation } from "@/types/domain"

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

    // Apply range filters
    const rangeFilters: (keyof Filters)[] = ['memorabilityScore', 'pronounceabilityScore', 'brandabilityScore', 'overallScore', 'seoKeywordRelevanceScore']
    rangeFilters.forEach(filterKey => {
      const minParam = searchParams.get(`${filterKey}Min`)
      const maxParam = searchParams.get(`${filterKey}Max`)
      if (minParam && maxParam) {
        const min = parseInt(minParam, 10)
        const max = parseInt(maxParam, 10)
        result = result.filter(domain => {
          let score: number | undefined
          if (filterKey === 'seoKeywordRelevanceScore') {
            score = domain.seoAnalysis?.seoKeywordRelevanceScore
          } else {
            score = domain.evaluation?.[filterKey as keyof DNEvaluation] as number | undefined
          }
          return score !== undefined && score >= min && score <= max
        })
      }
    })

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
        if (aValue === undefined || bValue === undefined || aValue === null || bValue === null) return 0;
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
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
              <TableHead>Availability Status</TableHead>
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
                  {domain.availabilityStatus?.status === "Available" ? "Available ✅" :
                   domain.availabilityStatus?.status === "Registered" ? "Not available ❌" :
                   domain.availabilityStatus?.status || 'N/A'}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDomain(domain)}
                  >
                    View Details
                  </Button>
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
