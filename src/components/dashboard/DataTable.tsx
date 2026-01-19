"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton,
} from "@/components/ui";
import { IPaginationResponse } from "@/lib/type";
import { SpinLoadingAnimation } from "../ui/SpinLoadingAnimation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: IPaginationResponse;
  manualPagination?: boolean;
  rowCount?: number;
  isLoading?: boolean;
  isLoadingInner?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  manualPagination,
  rowCount = 1,
  isLoading,
  isLoadingInner,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [pagination, setPagination] = React.useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    ...(manualPagination
      ? {
          manualPagination,
          rowCount: rowCount,
          onPaginationChange: setPagination,
        }
      : {
          getPaginationRowModel: getPaginationRowModel(),
        }),

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      ...(manualPagination ? { pagination } : {}),
    },
  });

  return isLoading ? (
    <TableSkeleton />
  ) : (
    <div className="w-full flex flex-col flex-1 min-h-full relative">
      <Table className="flex-1 min-h-full">
        <TableHeader className="bg-grey-50 rounded-lg mb-2">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className="bg-white min-h-full rounded-lg my-2 p-4 text-sm flex-1">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns?.length || 5}
                className="h-24 text-center text-sm"
              >
                {isLoadingInner ? (
                  <div className="flex gap-4 text-center items-center justify-center relative w-full">
                    Fetching data
                    <SpinLoadingAnimation className="m-auto" />
                  </div>
                ) : (
                  "No results."
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {pagination && (
        <div className="flex my-4">
          <Pagination {...pagination} />
        </div>
      )}
    </div>
  );
}
