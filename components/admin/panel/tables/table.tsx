import React from "react";
import { flexRender, Table as ReactTable } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableComponentProps {
  table: ReactTable<any>;
}

export function TableComponent({ table }: TableComponentProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-slate-300">
    <div className="overflow-auto">
      <Table className="w-full border-collapse">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-slate-100">
                {headerGroup.headers.map((header, index) => (
                  <TableHead 
                    key={header.id} 
                    className={`whitespace-nowrap border border-slate-300 p-2 ${
                      index === 0 ? 'rounded-tl-lg' : 
                      index === headerGroup.headers.length - 1 ? 'rounded-tr-lg' : ''
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <TableCell 
                      key={cell.id} 
                      className={`whitespace-nowrap border border-slate-300 p-2 ${
                        rowIndex === table.getRowModel().rows.length - 1 && cellIndex === 0 ? 'rounded-bl-lg' :
                        rowIndex === table.getRowModel().rows.length - 1 && cellIndex === row.getVisibleCells().length - 1 ? 'rounded-br-lg' : ''
                      }`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center border border-slate-300">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}