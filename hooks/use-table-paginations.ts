import { create } from "zustand";
import { Table } from "@tanstack/react-table";

interface TablePaginationState {
  table: Table<any> | null;
  setTable: (table: Table<any>) => void;
  getPageNumbers: () => number[];
  shouldShowEllipsis: () => boolean;
  totalPages: number;
}

const useTablePaginationStore = create<TablePaginationState>((set, get) => ({
  table: null,
  setTable: (table) => set({ table }),
  getPageNumbers: () => {
    const { table } = get();
    if (!table) return [];

    const totalPages = table.getPageCount();
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
  },
  shouldShowEllipsis: () => {
    const { table } = get();
    if (!table) return false;

    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex + 1;
    return totalPages > 3 && currentPage < totalPages - 1;
  },
  get totalPages() {
    const { table } = get();
    return table ? table.getPageCount() : 0;
  },
}));

export default useTablePaginationStore;
