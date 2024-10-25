"use client";
import { columnsUsers, User } from "./columns";
import { TableComponent } from "@/components/admin/admin-panel/tables/table";
import { PaginationComponent } from "@/components/admin/admin-panel/tables/table-pagination";
import { Search } from "@/components/admin/admin-panel/tables/table-search";
import { ColumnVisibilityDropdown } from "@/components/admin/admin-panel/tables/column-dropdown";
import useTablesSorting from "@/hooks/use-tables-sorting";

export function DataTableUsers({ data }: { data: User[] }) {
  const { table } = useTablesSorting({ data, columns: columnsUsers });
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
