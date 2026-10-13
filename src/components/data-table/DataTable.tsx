import { I18N } from "../../constants/i18n";
import {
  PaginationButton,
  PaginationRow,
  Spinner,
  Table,
  TableBodyWrapper,
  TableCell,
  TableHeader,
  TableHeaderRow,
  TableHeaderWrapper,
  TableRow,
  TableWrapper,
} from "../components";

export type Column<T> = {
  displayName: string;
  dataKey: keyof T;
  align?: "left" | "center" | "right";
  cellRenderer?: (row: T) => React.ReactNode;
};

export type DataTableProps<T> = {
  columns?: Array<Column<T>>;
  rows?: Array<T>;
  loading?: boolean;
  label?: string;
  total: number;
  page: number;
  pageSize: number;
  getRowKey: (row: T) => string;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
};

const DataTable =<T,>(props: DataTableProps<T>) => {
  const {
    columns,
    rows,
    loading,
    label,
    page,
    total,
    pageSize,
    getRowKey,
    onNextPage,
    onPreviousPage,
  } = props;
  return (
    <TableWrapper>
      <div className="flex flex-col h-[24em]">
        <div
          aria-busy={loading ? "true" : "false"}
          className={`flex-1 overflow-y-auto ${loading ? "flex items-center justify-center" : ""}`}
        >
          {loading ? (
            <Spinner role="status" aria-label={I18N.LOADING} />
          ) : (
            <Table aria-label={label}>
              <TableHeaderWrapper>
                <TableHeaderRow>
                  {columns?.map((column) => (
                    <TableHeader
                      scope="col"
                      align={column.align}
                      key={column.displayName}
                    >
                      {column.displayName}
                    </TableHeader>
                  ))}
                </TableHeaderRow>
              </TableHeaderWrapper>
              <TableBodyWrapper>
                {rows?.map((row) => (
                  <TableRow key={getRowKey(row)}>
                    {columns?.map((column) => (
                      <TableCell align={column.align} key={column.displayName}>
                        {column.cellRenderer
                          ? column.cellRenderer(row)
                          : String(row[column.dataKey] ?? "")}
                      </TableCell>
                    ))}
                  </TableRow> 
                ))}
              </TableBodyWrapper>
            </Table>
          )}
        </div>
        <div className="shrink-0">
          <PaginationRow>
            <PaginationButton disabled={page === 1} onClick={onPreviousPage}>
              {I18N.PREVIOUS_BUTTON}
            </PaginationButton>
            {page && <span>  {I18N.PAGE_LABEL} {page}</span>}
            <PaginationButton
              disabled={!total || page * pageSize >= total}
              onClick={onNextPage}
            >
              {I18N.NEXT_BUTTON}
            </PaginationButton>
          </PaginationRow>
        </div>
      </div>
    </TableWrapper>
  );
};

export default DataTable;
