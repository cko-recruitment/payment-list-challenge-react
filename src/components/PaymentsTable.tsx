import { Payment } from "../types/payment";
import { Spinner, SpinnerWrapper, StatusBadge, Table, TableBodyWrapper, TableCell, TableHeaderWrapper, TableRow } from "./components";
import { PaymetsTableHeader } from "./PaymentsTableHeader";
import { formatDate } from "../helpers/formatDate";

export const PaymentsTable = ({ payments, isLoading }: { payments: Payment[]; isLoading: boolean }) => {
    return (<>
        <Table>
            <TableHeaderWrapper>
                <PaymetsTableHeader />
            </TableHeaderWrapper>

            <TableBodyWrapper>
                {!isLoading && payments.map((payment: Payment) => (
                    <TableRow key={payment.id}>
                        <TableCell>{payment.id}</TableCell>

                        <TableCell>{formatDate(payment.date)}</TableCell>

                        <TableCell>{payment.amount}</TableCell>

                        <TableCell>{payment.customerName}</TableCell>

                        <TableCell>{payment.currency}</TableCell>

                        <TableCell><StatusBadge status={payment.status} >{payment.status}</StatusBadge></TableCell>
                    </TableRow>
                ))}
            </TableBodyWrapper>
        </Table>

        {isLoading && (
            <SpinnerWrapper>
                <Spinner />
            </SpinnerWrapper>
        )}
    </>);
};