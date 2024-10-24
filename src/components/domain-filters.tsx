import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterProps {
  onFilterChange: (filterType: string, value: string) => void
}

export function DomainFilters({ onFilterChange }: FilterProps) {
  const [statuses, setStatuses] = useState<string[]>([])
  const [tlds, setTlds] = useState<string[]>([])
  const [bots, setBots] = useState<string[]>([])
  const [industries, setIndustries] = useState<string[]>([])

  useEffect(() => {
    // Fetch filter data from the API
    const fetchFilterData = async () => {
      const response = await fetch('/api/filters')
      const data = await response.json()
      setStatuses(data.statuses)
      setTlds(data.tlds)
      setBots(data.bots)
      setIndustries(data.industries)
    }

    fetchFilterData()
  }, [])

  return (
    <div className="space-y-4">
      <Select onValueChange={(value) => onFilterChange('status', value)}>
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange('tld', value)}>
        <SelectTrigger>
          <SelectValue placeholder="TLD" />
        </SelectTrigger>
        <SelectContent>
          {tlds.map((tld) => (
            <SelectItem key={tld} value={tld}>
              {tld}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange('bot', value)}>
        <SelectTrigger>
          <SelectValue placeholder="Bot" />
        </SelectTrigger>
        <SelectContent>
          {bots.map((bot) => (
            <SelectItem key={bot} value={bot}>
              {bot}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange('industry', value)}>
        <SelectTrigger>
          <SelectValue placeholder="Industry" />
        </SelectTrigger>
        <SelectContent>
          {industries.map((industry) => (
            <SelectItem key={industry} value={industry}>
              {industry}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
