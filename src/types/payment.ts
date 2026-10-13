export type PaymentStatus = "completed" | "pending" | "failed" | "refunded";

export interface Payment {
    id: string;
    amount: number;
    currency: string;
    customerName: string;
    customerAddress: string;
    description: string;
    status: PaymentStatus;
    date: string;
}

export interface PaymentSearchResponse {
    payments: Payment[];
    total: number;
    page: number;
    pageSize: number;
}
