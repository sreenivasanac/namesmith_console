import { Suspense } from 'react';
import { fetchDomains } from '@/lib/actions/fetch-domains';
import DomainTable from '@/components/domain-table';
import Filters from '@/components/filters';
import { Pagination } from '@/components/ui/pagination';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page) || 1;
  const pageSize = Number(searchParams.pageSize) || 10;
  const search = searchParams.search as string | undefined;
  const status = searchParams.status as string | undefined;
  const tld = searchParams.tld as string | undefined;
  const bot = searchParams.bot as string | undefined;
  const industry = searchParams.industry as string | undefined;
  const sortBy = searchParams.sortBy as string | undefined;
  const sortOrder = searchParams.sortOrder as 'asc' | 'desc' | undefined;

  const { domains, totalCount } = await fetchDomains({
    page,
    pageSize,
    search,
    status,
    tld,
    bot,
    industry,
    sortBy,
    sortOrder,
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
        pageSize={pageSize}
      />
    </div>
  );
}