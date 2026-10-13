import { I18N } from "../../constants/i18n";
import DataTable, { Column } from "../data-table/DataTable";
import { StatusBadge } from "../components";
import { Payment, PaymentSearchResponse } from "../../types/Payment";
import { format } from "date-fns";

type PaymentTableProps = {
  isLoading:boolean
  pageSize: number;
  paymentsData?:PaymentSearchResponse;

  handleNextPage: () => void;
  handlePreviousPage: () => void;
  
}

const columns: Column<Payment>[] = [
    {
      displayName: I18N.TABLE_HEADER_PAYMENT_ID,
      dataKey: "id",
      align: "left",
    },
    {
      displayName: I18N.TABLE_HEADER_DATE,
      dataKey: "date",
      align: "left",
      cellRenderer: (row) => format(new Date(row.date), "dd/MM/yyyy, HH:mm:ss")
    },
    {
      displayName: I18N.TABLE_HEADER_AMOUNT,
      dataKey: "amount",
      align: "right",
      cellRenderer: (row) => row.amount.toFixed(2),
    },
    {
      displayName: I18N.TABLE_HEADER_CUSTOMER,
      dataKey: "customerName",
      align: "left",
    },
    {
      displayName: I18N.TABLE_HEADER_CURRENCY,
      dataKey: "currency",
      align: "left",
    },
    {
      displayName: I18N.TABLE_HEADER_STATUS,
      dataKey: "status",
      align: "left",
      cellRenderer: (row) => (
        <StatusBadge status={row.status}>{row.status}</StatusBadge>
      ),
    },
];

const PaymentTable: React.FC<PaymentTableProps> = (props) => {
 const { pageSize, paymentsData, isLoading,handlePreviousPage,handleNextPage } = props;
  return (
    <DataTable
      loading={isLoading}
      label={I18N.TABLE_LABEL}
      pageSize={pageSize}
      columns={columns}
      page={paymentsData?.page ?? 1}
      total={paymentsData?.total ?? 0}
      rows={paymentsData?.payments ?? []}
      getRowKey={(row) => row.id}
      onNextPage={handleNextPage}
      onPreviousPage={handlePreviousPage}
    />
  );
};

export default PaymentTable;
