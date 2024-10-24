"use client";

import { useFilterStore } from '@/store/filterStore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Filters, RangeFilter } from '@/types/domain'

interface Option {
  label: string
  value: string
}

interface FilterOptions {
  status: Option[]
  tld: Option[]
  bot: Option[]
  industry: Option[]
}

function FilterSection({ title, options, filterKey }: { title: string, options: Option[], filterKey: keyof Filters }) {
  const { [filterKey]: selectedValues, setFilter } = useFilterStore()

  const handleCheckboxChange = (value: string) => {
    if (Array.isArray(selectedValues)) {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value]
      setFilter(filterKey, newValues)
    }
  }

  const getDisplayLabel = (option: Option) => {
    if (filterKey === 'status') {
      if (option.value === 'Available') return 'Available ✅'
      if (option.value === 'Registered') return 'Not available ❌'
    }
    return option.label
  }

  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <Checkbox
              id={`${filterKey}-${option.value}`}
              checked={Array.isArray(selectedValues) && selectedValues.includes(option.value)}
              onCheckedChange={() => handleCheckboxChange(option.value)}
            />
            <Label
              htmlFor={`${filterKey}-${option.value}`}
              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {getDisplayLabel(option)}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}

function RangeFilterSection({ title, filterKey }: { title: string, filterKey: keyof Filters }) {
  const { [filterKey]: range, setFilter } = useFilterStore()

  const handleRangeChange = (values: number[]) => {
    setFilter(filterKey, { min: values[0], max: values[1] })
  }

  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      <Slider
        min={1}
        max={10}
        step={1}
        value={[range?.min ?? 1, range?.max ?? 10]}
        onValueChange={handleRangeChange}
      />
      <div className="flex justify-between mt-2">
        <span>{range?.min ?? 1}</span>
        <span>{range?.max ?? 10}</span>
      </div>
    </div>
  )
}

export default function Filters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { search, setSearch, resetFilters, ...filters } = useFilterStore()
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    status: [],
    tld: [],
    bot: [],
    industry: [],
  })

  useEffect(() => {
    // Fetch filter options from the API
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch('/api/filters')
        const data = await response.json()
        setFilterOptions({
          status: data.statuses.map((s: string) => ({ label: s, value: s })),
          tld: data.tlds.map((t: string) => ({ label: t, value: t })),
          bot: data.bots.map((b: string) => ({ label: b, value: b })),
          industry: data.industries.map((i: string) => ({ label: i, value: i })),
        })
      } catch (error) {
        console.error('Failed to fetch filter options:', error)
      }
    }

    fetchFilterOptions()
  }, [])

  useEffect(() => {
    // Initialize filters from URL on component mount
    const urlSearch = searchParams.get('search') || ''
    const urlStatus = searchParams.get('status')?.split(',') || []
    const urlTld = searchParams.get('tld')?.split(',') || []
    const urlBot = searchParams.get('bot')?.split(',') || []
    const urlIndustry = searchParams.get('industry')?.split(',') || []

    setSearch(urlSearch)
    useFilterStore.setState({
      status: urlStatus,
      tld: urlTld,
      bot: urlBot,
      industry: urlIndustry,
    })
  }, [])

  const applyFilters = useCallback(() => {
    const searchParams = new URLSearchParams()

    if (search) searchParams.set('search', search)
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        searchParams.set(key, value.join(','))
      } else if (typeof value === 'object' && value !== null && 'min' in value && 'max' in value) {
        searchParams.set(`${key}Min`, value.min.toString())
        searchParams.set(`${key}Max`, value.max.toString())
      }
    })

    router.push(`/dashboard?${searchParams.toString()}`)
  }, [router, search, filters])

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

      <FilterSection title="Domain Availability Status" options={filterOptions.status} filterKey="status" />
      <FilterSection title="TLDs" options={filterOptions.tld} filterKey="tld" />
      <FilterSection title="Bots" options={filterOptions.bot} filterKey="bot" />
      <FilterSection title="Industries" options={filterOptions.industry} filterKey="industry" />

      <RangeFilterSection title="Memorability Score" filterKey="memorabilityScore" />
      <RangeFilterSection title="Pronounceability Score" filterKey="pronounceabilityScore" />
      <RangeFilterSection title="Brandability Score" filterKey="brandabilityScore" />
      <RangeFilterSection title="Overall Score" filterKey="overallScore" />
      <RangeFilterSection title="SEO Keyword Relevance Score" filterKey="seoKeywordRelevanceScore" />

      <Button onClick={applyFilters} className="w-full mb-2">Apply Filters</Button>
      <Button onClick={handleResetFilters} className="w-full" variant="outline">Reset Filters</Button>
    </div>
  )
}
