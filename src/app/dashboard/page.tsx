import { Suspense } from 'react';
import { fetchDomains } from '@/lib/actions/fetch-domains';
import { DomainTable } from '@/components/domain-table';
import Filters from '@/components/filters';
import { Pagination } from '@/components/ui/pagination';

interface SearchParams {
  page?: string;
  pageSize?: string;
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
  const page = Number(searchParams.page) || 1;
  const pageSize = Number(searchParams.pageSize) || 10;

  const { domains, totalCount } = await fetchDomains({
    page,
    pageSize,
    search: searchParams.search,
    status: searchParams.status,
    tld: searchParams.tld,
    bot: searchParams.bot,
    industry: searchParams.industry,
    sortBy: searchParams.sortBy,
    sortOrder: searchParams.sortOrder,
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Domain Dashboard</h1>
      <Filters />
      <Suspense fallback={<div>Loading...</div>}>
        <DomainTable domains={domains} />
      </Suspense>
      <Pagination
        totalItems={totalCount}
        currentPage={page}
        itemsPerPage={pageSize}
        baseUrl="/dashboard"
      />
    </div>
  );
}