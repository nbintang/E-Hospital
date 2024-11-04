"use client";

import { productsColumn, Medicine } from "./column";
import {
  TableComponent,
  PaginationComponent,
  Search,
  ColumnVisibilityDropdown,
} from "@/components/admin/admin-panel/tables";
import useTablesSorting from "@/hooks/use-tables-sorting";

export function DataTableMedicine({ data }: { data: Medicine[] }) {
  const { table } = useTablesSorting({ data, columns: productsColumn });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4 space-x-4">
        <Search table={table} />
        <ColumnVisibilityDropdown table={table} />
      </div>
      <TableComponent table={table} />
      <div className="flex items-center justify-end space-x-2 py-4">
        <PaginationComponent table={table} />
      </div>
    </div>
  );
}
