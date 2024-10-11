"use client";

import { useFilterStore } from '@/store/filterStore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState, useCallback, useMemo } from 'react'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
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

function MultiSelect({ filterKey, placeholder }: { filterKey: string, placeholder: string }) {
  const {
    [filterKey]: selectedValues,
    setFilter,
  } = useFilterStore()

  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const filteredOptions: Array<{ value: string, label: string }> = useMemo(() =>
    (filterOptions[filterKey] || []).filter(option =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    ), [filterKey, searchValue]
  )

  const handleSelect = useCallback((optionValue: string) => {
    setFilter(filterKey,
      (selectedValues || []).includes(optionValue)
        ? (selectedValues || []).filter(value => value !== optionValue)
        : [...(selectedValues || []), optionValue]
    )
  }, [filterKey, selectedValues, setFilter])

  const selectedCount = Array.isArray(selectedValues) ? selectedValues.length : 0

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedCount > 0
            ? `${selectedCount} selected`
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandEmpty>No {placeholder.toLowerCase()} found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {filteredOptions.length > 0 ? filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      Array.isArray(selectedValues) && selectedValues.includes(option.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              )) : <CommandItem>No options available</CommandItem>}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
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
    <div className="flex flex-wrap gap-4 mb-6">
      <Input
        placeholder="Search domains"
        className="max-w-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <MultiSelect filterKey="status" placeholder="Select status" />
      <MultiSelect filterKey="tld" placeholder="Select TLDs" />
      <MultiSelect filterKey="bot" placeholder="Select Bots" />
      <MultiSelect filterKey="industry" placeholder="Select Industries" />

      <Button onClick={applyFilters}>Apply Filters</Button>
      <Button variant="outline" onClick={handleResetFilters}>Reset Filters</Button>
    </div>
  )
}