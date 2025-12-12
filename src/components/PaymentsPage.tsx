import { useState, useEffect, useCallback, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  CellContext,
  ColumnDef,
} from "@tanstack/react-table";
import { API_URL } from "../constants/index";
import { Container, TableCell, Table, TableHeader, TableRow, TableHeaderWrapper, TableBodyWrapper } from "./components";

type Payment = {
  id: string;
  customerName: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
};

// Custom hook for managing payment table data
const usePaymentTable = (apiBaseUrl = API_URL) => {
  // state management
  const [payments, setPayments] = useState([]);
  const [page] = useState(1);
  const [pageSize] = useState(5);

  const query = `page=${page}&pageSize=${pageSize}`;

  // API call to fetch payments
  const fetchPayments = useCallback(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}?${query}`);
      const data = await response.json();
      setPayments(data.payments || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  }, [apiBaseUrl]);

  // Auto-fetch when dependencies change
  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return { payments };
};

const PaymentsTable = () => {
  const { payments } = usePaymentTable();

  const columnHelper = createColumnHelper();

  const columns = useMemo<ColumnDef<Payment>[]>(
    () => [
      columnHelper.accessor("id", {
        header: "Payment ID",
        cell: (info: CellContext<unknown, never>) => (
          <TableCell>
            {info.getValue()}
          </TableCell>
        ),
      }),
      columnHelper.accessor("customerName", {
        header: "Customer",
        cell: (info: CellContext<unknown, never>) => (
          <TableCell>
            {info.getValue()}
          </TableCell>
        ),
      }),
      columnHelper.accessor("date", {
        header: "Date",
        cell: (info: CellContext<unknown, never>) => (
          <TableCell>
            ${info.getValue()}
          </TableCell>
        ),
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info: CellContext<unknown, never>) => (
          <TableCell>
            ${info.getValue()}
          </TableCell>
        ),
      }),
      columnHelper.accessor("Currency", {
        header: "Currency",
        cell: (info: CellContext<unknown, never>) => (
          <TableCell>
            ${info.getValue()}
          </TableCell>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info: CellContext<unknown, never>) => (
          <TableCell>
            {info.getValue()}
          </TableCell>
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
  )
};

export const PaymentsPage = () => {
  return (
    <Container>
      <PaymentsTable />
    </Container>
  );
};
