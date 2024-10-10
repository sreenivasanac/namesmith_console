import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

function MultiSelect({ placeholder }: { placeholder: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={false}
          className="w-[200px] justify-between"
        >
          {placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandEmpty>No {placeholder.toLowerCase()} found.</CommandEmpty>
          <CommandGroup>
            <CommandItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              Option 1
            </CommandItem>
            <CommandItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              Option 2
            </CommandItem>
            <CommandItem>
              <Check className="mr-2 h-4 w-4 opacity-0" />
              Option 3
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default function Filters() {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Input
        placeholder="Search domains"
        className="max-w-sm"
      />

      <MultiSelect placeholder="Select status" />
      <MultiSelect placeholder="Select TLDs" />
      <MultiSelect placeholder="Select Bots" />
      <MultiSelect placeholder="Select Industries" />

      <Button>Apply Filters</Button>
      <Button variant="outline">Reset Filters</Button>
    </div>
  )
}