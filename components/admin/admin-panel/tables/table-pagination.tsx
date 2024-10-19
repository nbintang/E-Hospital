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
import useTablePaginationsStore from "@/hooks/use-table-paginations";

interface PaginationProps {
  table: Table<any>;
}

export function PaginationComponent({ table }: PaginationProps) {
  const { totalPages, getPageNumbers, shouldShowEllipsis } =
    useTablePaginationsStore((state) => state);
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
