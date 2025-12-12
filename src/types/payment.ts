export type Payment = {
  id: string;
  customerName: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
};

export interface PaymentSearchResponse {
}
