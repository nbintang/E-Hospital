import { Table } from "@tanstack/react-table";

export default function useTablePaginations({ table }: { table: Table<any> }) {
  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;
  const maxVisiblePages = 5; // Show up to 5 pages

  const getPageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: number[] = [];
    if (currentPage <= 3) {
      // Show first 4 pages and ellipsis at the end
      pages.push(1, 2, 3, -1, totalPages);
    } else if (currentPage > totalPages - 3) {
      // Show ellipsis at the start and last 4 pages
      pages.push(1, -1, totalPages - 2, totalPages - 1, totalPages);
    } else {
      // Show ellipsis on both sides of the current page
      pages.push(
        1,
        -1,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        -1,
        totalPages
      );
    }
    return pages;
  };
  return {
    totalPages,
    currentPage,
    getPageNumbers,
  };
}
