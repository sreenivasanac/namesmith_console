"use client";

import { useFilterStore } from '@/store/filterStore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface Option {
  label: string
  value: string
}

const filterOptions: Record<string, Option[]> = {
  status: [
    { label: "Available", value: "available" },
    { label: "Reserved", value: "reserved" },
    { label: "Sold", value: "sold" },
    { label: "Auction", value: "auction" },
    { label: "Premium", value: "premium" },
  ],
  tld: [
    { label: ".com", value: "com" },
    { label: ".net", value: "net" },
    { label: ".org", value: "org" },
  ],
  bot: [
    { label: "Bot 1", value: "bot1" },
    { label: "Bot 2", value: "bot2" },
    { label: "Bot 3", value: "bot3" },
  ],
  industry: [
    { label: "Tech", value: "tech" },
    { label: "Finance", value: "finance" },
    { label: "Health", value: "health" },
  ],
}

function FilterSection({ title, options, filterKey }: { title: string, options: Option[], filterKey: 'status' | 'tld' | 'bot' | 'industry' }) {
  const { [filterKey]: selectedValues, setFilter } = useFilterStore()

  const handleCheckboxChange = (value: string) => {
    const newValues = selectedValues?.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...(selectedValues || []), value]
    setFilter(filterKey, newValues)
  }

  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <Checkbox
              id={`${filterKey}-${option.value}`}
              checked={selectedValues?.includes(option.value)}
              onCheckedChange={() => handleCheckboxChange(option.value)}
            />
            <label
              htmlFor={`${filterKey}-${option.value}`}
              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Filters() {
  const router = useRouter()
  const { search, setSearch, resetFilters } = useFilterStore()

  const applyFilters = useCallback(() => {
    const filters = useFilterStore.getState()
    const searchParams = new URLSearchParams()

    if (filters.search) searchParams.set('search', filters.search)
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        searchParams.set(key, value.join(','))
      }
    })

    router.push(`/dashboard?${searchParams.toString()}`)
  }, [router])

  const handleResetFilters = useCallback(() => {
    resetFilters()
    router.push('/dashboard')
  }, [resetFilters, router])

  return (
    <div className="w-64 p-4 border-r">
      <Input
        placeholder="Search domains"
        className="mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <FilterSection title="Status" options={filterOptions.status} filterKey="status" />
      <FilterSection title="TLDs" options={filterOptions.tld} filterKey="tld" />
      <FilterSection title="Bots" options={filterOptions.bot} filterKey="bot" />
      <FilterSection title="Industries" options={filterOptions.industry} filterKey="industry" />

      <Button onClick={applyFilters} className="w-full mb-2">Apply Filters</Button>
      <Button variant="outline" onClick={handleResetFilters} className="w-full">Reset Filters</Button>
    </div>
  )
}