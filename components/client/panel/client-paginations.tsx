"use client";
import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import usePaginations from "@/hooks/use-paginations";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ClientPaginations({
  currentData,
  setTotalPages,
}: {
  currentData: number;
  setTotalPages: number;
}) {
  const { totalPages, currentPage, getPageNumbers } = usePaginations({
    totalPages: setTotalPages,
    currentData,
  });
  const router = useRouter();
  const handlePageClick = (page: number) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      router.push(`?page=${page}`);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      router.push(`?page=${currentPage - 1}`);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      router.push(`?page=${currentPage + 1}`);
    }
  };

  return totalPages > 1 ? (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <Button
            size={"icon"}
            variant={"ghost"}
            disabled={currentPage === 1}
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handlePrevious();
            }}
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>

        {/* Page Numbers with Ellipsis */}
        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === -1 ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(page);
                }}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <Button
            size={"icon"}
            variant={"ghost"}
            disabled={currentPage === totalPages}
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ) : null;
}
