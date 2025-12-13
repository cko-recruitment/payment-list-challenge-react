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
import {I18N} from "../../constants/i18n";

export const PaymentsTable = () => {
  const { payments } = usePaymentTable();

  const columnHelper = createColumnHelper();

  const columns = useMemo<ColumnDef<Payment>[]>(
    () =>
      [
        columnHelper.accessor("id", {
          header: I18N.TABLE_HEADER_PAYMENT_ID,
          cell: (info: CellContext<unknown, never>) => (
            <TableCell>{info.getValue()}</TableCell>
          ),
        }),
        columnHelper.accessor("date", {
          header: I18N.TABLE_HEADER_DATE,
          cell: (info: CellContext<unknown, never>) => (
            <TableCell>{new Date(info.getValue()).toLocaleString()}</TableCell>
          ),
        }),
        columnHelper.accessor("amount", {
          header: I18N.TABLE_HEADER_AMOUNT,
          cell: (info: CellContext<unknown, never>) => (
            <TableCell>{Number.parseFloat(info.getValue()).toFixed(2)}</TableCell>
          ),
        }),
        columnHelper.accessor("customerName", {
          header: I18N.TABLE_HEADER_CUSTOMER,
          cell: (info: CellContext<unknown, never>) => (
            <TableCell>{info.getValue()}</TableCell>
          ),
        }),
        columnHelper.accessor("currency", {
          header: I18N.TABLE_HEADER_CURRENCY,
          cell: (info: CellContext<unknown, never>) => (
            <TableCell>{info.getValue()}</TableCell>
          ),
        }),
        columnHelper.accessor("status", {
          header: I18N.TABLE_HEADER_STATUS,
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
