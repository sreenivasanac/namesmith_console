'use client';

import React from 'react';
import { Button } from './button';
import { useRouter } from 'next/navigation';

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  baseUrl: string;
}

export function Pagination({ totalItems, currentPage, itemsPerPage, baseUrl }: PaginationProps) {
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    const url = new URL(baseUrl, window.location.origin);
    url.searchParams.set('page', newPage.toString());
    router.push(url.toString());
  };

  return (
    <nav className="flex justify-center space-x-2 mt-4">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span className="py-2 px-3 bg-gray-200 rounded">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </nav>
  );
}
