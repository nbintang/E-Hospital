"use client";
import { columnsUsers } from "./columns";
import { TableComponent } from "@/components/admin/panel/tables/table";
import { TablePagination } from "@/components/admin/panel/tables/table-pagination";
import { Search } from "@/components/admin/panel/tables/table-search";
import { ColumnVisibilityDropdown } from "@/components/admin/panel/tables/column-dropdown";
import useTablesSorting from "@/hooks/table/use-tables-sorting";
import { UserProps } from "@/types/user";

export function DataTableUsers({ data }: { data: UserProps[] }) {
  const { table } = useTablesSorting({ data, columns: columnsUsers });
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
