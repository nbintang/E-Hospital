"use client";

import { productsColumn} from "./column";
import {
  TableComponent,
  TablePagination,
  Search,
  ColumnVisibilityDropdown,
} from "@/components/admin/panel/tables";
import useTablesSorting from "@/hooks/table/use-tables-sorting";
import { Medicine } from "@prisma/client";

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
        <TablePagination table={table} />
      </div>
    </div>
  );
}
