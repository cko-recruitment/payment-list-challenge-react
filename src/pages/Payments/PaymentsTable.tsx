import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  CellContext,
  ColumnDef,
} from "@tanstack/react-table";
import {
  TableCell,
  Table,
  TableHeader,
  TableRow,
  TableHeaderWrapper,
  TableBodyWrapper,
} from "../../components/components";
import { usePaymentTable } from "../../hooks/usePaymentTable";
import { Payment } from "../../types/payment";

export const PaymentsTable = () => {
  const { payments } = usePaymentTable();

  const columnHelper = createColumnHelper();

  const columns = useMemo<ColumnDef<Payment>[]>(
    () =>
      [
        columnHelper.accessor("id", {
          header: "Payment ID",
          cell: (info: CellContext<unknown, never>) => (
            <TableCell>{info.getValue()}</TableCell>
          ),
        }),
        columnHelper.accessor("customerName", {
          header: "Customer",
          cell: (info: CellContext<unknown, never>) => (
            <TableCell>{info.getValue()}</TableCell>
          ),
        }),
        columnHelper.accessor("date", {
          header: "Date",
          cell: (info: CellContext<unknown, never>) => (
            <TableCell>${info.getValue()}</TableCell>
          ),
        }),
        columnHelper.accessor("amount", {
          header: "Amount",
          cell: (info: CellContext<unknown, never>) => (
            <TableCell>${info.getValue()}</TableCell>
          ),
        }),
        columnHelper.accessor("Currency", {
          header: "Currency",
          cell: (info: CellContext<unknown, never>) => (
            <TableCell>${info.getValue()}</TableCell>
          ),
        }),
        columnHelper.accessor("status", {
          header: "Status",
          cell: (info: CellContext<unknown, never>) => (
            <TableCell>{info.getValue()}</TableCell>
          ),
        }),
      ] as ColumnDef<Payment>[],
    [columnHelper]
  );

  // TanStack Table configuration
  const table = useReactTable({
    data: payments,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log("Payments data:", payments);

  // Render the table
  return (
    <Table>
      <TableHeaderWrapper>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHeader key={header.id} colSpan={header.colSpan}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHeader>
            ))}
          </TableRow>
        ))}
      </TableHeaderWrapper>
      <TableBodyWrapper>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBodyWrapper>
    </Table>
  );
};
