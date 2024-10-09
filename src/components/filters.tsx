"use client";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
import { useState } from 'react';
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Filters() {
  const [filters, setFilters] = useState({
    status: [],
    tld: [],
    bot: [],
    industry: []
  });

  const statuses = [
    { label: "Available", value: "available" },
    { label: "Reserved", value: "reserved" },
    { label: "Sold", value: "sold" },
    { label: "Auction", value: "auction" },
    { label: "Premium", value: "premium" },
  ]

  const tlds = [
    { label: ".com", value: "com" },
    { label: ".net", value: "net" },
    { label: ".org", value: "org" },
  ]

  const bots = [
    { label: "Bot 1", value: "bot1" },
    { label: "Bot 2", value: "bot2" },
    { label: "Bot 3", value: "bot3" },
  ]

  const industries = [
    { label: "Tech", value: "tech" },
    { label: "Finance", value: "finance" },
    { label: "Health", value: "health" },
  ]

  const MultiSelect = ({ value, onChange, options, placeholder }) => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const selectedValues = value || [];

    const filteredOptions = options.filter(option => 
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedValues.length > 0
              ? `${selectedValues.length} selected`
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
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={(itemValue) => {
                    let newValues;
                    if (selectedValues.includes(option.value)) {
                      newValues = selectedValues.filter(item => item !== option.value);
                    } else {
                      newValues = [...selectedValues, option.value];
                    }
                    onChange(newValues);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.includes(option.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Input placeholder="Search domains" className="max-w-sm" />
      
      <MultiSelect
        value={filters.status}
        onChange={(newValue: string[]) => setFilters(prev => ({
          status: [],
          tld: [],
          bot: [],
          industry: [],
          ...prev,
          status: newValue
        }))}
        options={statuses}
        placeholder="Select status"
      />

      <MultiSelect
        value={filters.tld}
        onChange={(newValue: string[]) => setFilters(prev => ({
          status: [],
          tld: [],
          bot: [],
          industry: [],
          ...prev,
          tld: newValue
        }))}
        options={tlds}
        placeholder="Select TLDs"
      />

      <MultiSelect
        value={filters.bot}
        onChange={(newValue: string[]) => setFilters(prev => ({
          status: [],
          tld: [],
          bot: [],
          industry: [],
          ...prev,
          bot: newValue
        }))}
        options={bots}
        placeholder="Select Bots"
      />

      <MultiSelect
        value={filters.industry}
        onChange={(newValue: string[]) => setFilters(prev => ({
          status: [],
          tld: [],
          bot: [],
          industry: [],
          ...prev,
          industry: newValue
        }))}
        options={industries}
        placeholder="Select Industries"
      />

      <Button>Apply Filters</Button>
    </div>
  );
}