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

const initialState = {
  search: '',
  status: [] as string[],
  tld: [] as string[],
  bot: [] as string[],
  industry: [] as string[],
}

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,
  setSearch: (search) => set({ search }),
  setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
  resetFilters: () => set(initialState),
}))