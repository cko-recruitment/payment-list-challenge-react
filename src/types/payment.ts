import {PaymentStatus} from "../constants";

export interface Payment {
  id: string;
  customerName: string;
  amount: number;
  customerAddress: string;
  currency: string;
  status: PaymentStatus;
  date: string;
  description: string;
}

export interface PaymentSearchResponse {
  payments: Payment[];
  total: number;
  page: number;
  pageSize: number;
}
