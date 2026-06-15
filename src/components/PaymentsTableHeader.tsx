import { I18N } from "../constants/i18n";
import { TableHeader, TableHeaderRow } from "./components";

export const PaymetsTableHeader = () => <TableHeaderRow>
    <TableHeader>{I18N.TABLE_HEADER_PAYMENT_ID}</TableHeader>

    <TableHeader>{I18N.TABLE_HEADER_DATE}</TableHeader>

    <TableHeader>{I18N.TABLE_HEADER_AMOUNT}</TableHeader>

    <TableHeader>{I18N.TABLE_HEADER_CUSTOMER}</TableHeader>

    <TableHeader>{I18N.TABLE_HEADER_CURRENCY}</TableHeader>

    <TableHeader>{I18N.TABLE_HEADER_STATUS}</TableHeader>
</TableHeaderRow>