import { create } from 'zustand'
import { Filters, RangeFilter } from '@/types/domain'

interface FilterStore extends Filters {
  setSearch: (search: string) => void
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void
  resetFilters: () => void
}

const initialRangeFilter: RangeFilter = { min: 1, max: 10 }

const useFilterStore = create<FilterStore>((set) => ({
  search: '',
  status: [],
  tld: [],
  bot: [],
  industry: [],
  memorabilityScore: initialRangeFilter,
  pronounceabilityScore: initialRangeFilter,
  brandabilityScore: initialRangeFilter,
  overallScore: initialRangeFilter,
  seoKeywordRelevanceScore: initialRangeFilter,
  setSearch: (search) => set({ search }),
  setFilter: (key, value) => set({ [key]: value }),
  resetFilters: () => set({
    search: '',
    status: [],
    tld: [],
    bot: [],
    industry: [],
    memorabilityScore: initialRangeFilter,
    pronounceabilityScore: initialRangeFilter,
    brandabilityScore: initialRangeFilter,
    overallScore: initialRangeFilter,
    seoKeywordRelevanceScore: initialRangeFilter,
  }),
}))

export { useFilterStore }
