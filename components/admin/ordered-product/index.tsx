"use client";
import * as React from "react";
import useTablesSorting from "@/hooks/use-tables-sorting";
import { orderedProductColumns, OrderProps } from "./column";
import {
  ColumnVisibilityDropdown,
  PaginationComponent,
  Search,
  TableComponent,
} from "../admin-panel/tables";

export default function OrderedProducts({ data }: { data: OrderProps[] }) {
  const { table } = useTablesSorting({ data, columns: orderedProductColumns });

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
