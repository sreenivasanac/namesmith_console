import { create } from 'zustand'
import { DomainName } from '@prisma/client'

interface FilterState {
  search: string
  status: string[]
  tld: string[]
  bot: string[]
  industry: string[]
  sorting: { id: string; desc: boolean } | undefined
  pagination: { pageIndex: number; pageSize: number }
  setSearch: (search: string) => void
  setFilter: (key: 'status' | 'tld' | 'bot' | 'industry', value: string[]) => void
  setSorting: (sorting: { id: string; desc: boolean } | undefined) => void
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void
  resetFilters: () => void
}

const initialState = {
  search: '',
  status: [] as string[],
  tld: [] as string[],
  bot: [] as string[],
  industry: [] as string[],
  sorting: undefined as { id: string; desc: boolean } | undefined,
  pagination: { pageIndex: 0, pageSize: 10 },
}

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,
  setSearch: (search) => set({ search }),
  setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
  setSorting: (sorting) => set({ sorting }),
  setPagination: (pagination) => set({ pagination }),
  resetFilters: () => set(initialState),
}))