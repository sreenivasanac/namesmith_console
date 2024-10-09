import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function Filters() {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Input placeholder="Search domains" className="max-w-sm" />
      <Select>
        <option value="">All Statuses</option>
        <option value="available">Available</option>
        <option value="reserved">Reserved</option>
        <option value="sold">Sold</option>
        <option value="auction">Auction</option>
        <option value="premium">Premium</option>
      </Select>
      <Select>
        <option value="">All TLDs</option>
        <option value="com">.com</option>
        <option value="net">.net</option>
        <option value="org">.org</option>
        {/* Add more TLDs as needed */}
      </Select>
      <Select>
        <option value="">All Bots</option>
        <option value="bot1">Bot 1</option>
        <option value="bot2">Bot 2</option>
        <option value="bot3">Bot 3</option>
        {/* Add more bots as needed */}
      </Select>
      <Select>
        <option value="">All Industries</option>
        <option value="tech">Tech</option>
        <option value="finance">Finance</option>
        <option value="health">Health</option>
        {/* Add more industries as needed */}
      </Select>
      <Button>Apply Filters</Button>
    </div>
  );
}