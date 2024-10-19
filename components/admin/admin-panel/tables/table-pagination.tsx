"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Table } from "@tanstack/react-table";

interface PaginationProps {
  table: Table<any>;
}

export function PaginationComponent({ table }: PaginationProps) {
  const totalPages = table.getPageCount();

  const getPageNumbers = () => {
    const currentPage = table.getState().pagination.pageIndex + 1;
    const maxDisplay = 3;

    if (totalPages <= maxDisplay) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 2) {
      return [1, 2, 3];
    }

    if (currentPage >= totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const shouldShowEllipsis = () => {
    const currentPage = table.getState().pagination.pageIndex + 1;
    return totalPages > 3 && currentPage < totalPages - 1;
  };

  return totalPages > 1 ? (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {table.getCanPreviousPage() && (
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                table.previousPage();
              }}
            />
          )}
        </PaginationItem>
        {getPageNumbers().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                table.setPageIndex(page - 1);
              }}
              isActive={table.getState().pagination.pageIndex === page - 1}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {shouldShowEllipsis() && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {table.getCanNextPage() && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                table.nextPage();
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  ) : null;
}
