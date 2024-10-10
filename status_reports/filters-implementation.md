# Filters Implementation Guide

This guide will walk you through implementing the `filters.tsx` file step by step. We'll start with easier tasks and gradually increase complexity.

## 1. Set up the basic structure and imports

Start by creating a new file named `filters.tsx` in the `src/components` directory. Add the following imports at the top of the file:

```typescript
"use client";
import { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useFilterStore } from '@/store/filterStore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
Command,
CommandEmpty,
CommandGroup,
CommandInput,
CommandItem,
} from "@/components/ui/command"
import {
Popover,
PopoverContent,
PopoverTrigger,
} from "@/components/ui/popover"
```

## ## 2. Define the Option interface and filterOptions object

Add the following type definition and constant object after the imports:

```typescript
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
```

## 3. Set up the filter store

Create a new file named `filterStore.ts` in the `src/store` directory. Add the following code to define the store:

```typescript
import { create } from 'zustand'

interface FilterState {
  search: string
  status: string[]
  tld: string[]
  bot: string[]
  industry: string[]
  setSearch: (search: string) => void
  setFilter: (key: 'status' | 'tld' | 'bot' | 'industry', value: string[]) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  search: '',
  status: [],
  tld: [],
  bot: [],
  industry: [],
  setSearch: (search) => set({ search }),
  setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
  resetFilters: () => set({
    search: '',
    status: [],
    tld: [],
    bot: [],
    industry: [],   
  })),
}))
```

## 4. Implement the MultiSelect component

Add the following code to implement the `MultiSelect` component:

```typescript
function MultiSelect({ filterKey, placeholder }: { filterKey: string, placeholder: string }) {
// Component logic will go here
}
```

## 5. ### 3.1. Set up state and store access

Inside the `MultiSelect` component, add the following:

```typescript
typescript
const {
[filterKey]: selectedValues,
setFilter,
} = useFilterStore()
const [open, setOpen] = useState(false)
const [searchValue, setSearchValue] = useState('')
```

## 6. ### 3.2. Implement filteredOptions

Add the `filteredOptions` memoized value:


```typescript
typescript
const filteredOptions: Array<{ value: string, label: string }> = useMemo(() =>
(filterOptions[filterKey] || []).filter(option =>
option.label.toLowerCase().includes(searchValue.toLowerCase())
), [filterKey, searchValue]
)
```
### 3.3. Implement handleSelect function

Add the `handleSelect` function:
typescript
const handleSelect = useCallback((optionValue: string) => {
setFilter(filterKey,
selectedValues.includes(optionValue)
? selectedValues.filter(value => value !== optionValue)
: [...(selectedValues || []), optionValue]
)
}, [filterKey, selectedValues, setFilter])

## 7. ### 3.3. Implement handleSelect

Add the `handleSelect` function:

```typescript
typescript
const handleSelect = (value: string) => {
### 3.4. Calculate selectedCount

Add the following line to calculate `selectedCount`:
