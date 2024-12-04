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
import useTablePaginations from "@/hooks/table/use-table-paginations";

interface PaginationProps {
  table: Table<any>;
}

export function PaginationComponent({ table }: PaginationProps) {
  const { totalPages, currentPage, getPageNumbers } = useTablePaginations({
    table,
  });

  return totalPages > 1 ? (
    <Pagination>
      <PaginationContent>
        {table.getCanPreviousPage() && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                table.previousPage();
              }}
            />
          </PaginationItem>
        )}

        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === -1 ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  table.setPageIndex(page - 1);
                }}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

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