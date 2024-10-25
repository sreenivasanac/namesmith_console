import { Suspense } from 'react';
import { fetchDomains } from '@/lib/actions/fetch-domains';
import { DomainTable } from '@/components/domain-table';
import Filters from '@/components/filters';

interface SearchParams {
  search?: string;
  status?: string;
  tld?: string;
  bot?: string;
  industry?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { domains } = await fetchDomains(searchParams);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Namesmith Domain Names Dashboard</h1>
      <div className="flex">
        <div className="w-1/4 pr-4">
          <Filters />
        </div>
        <div className="w-3/4">
          <Suspense fallback={<div>Loading...</div>}>
            <DomainTable domains={domains} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
