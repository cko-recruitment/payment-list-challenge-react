export interface Payment {
    amount:number;
    currency:string
    customerAddress:string;
    customerName:string;
    date:string;
    id:string;
    status:string;
    description:string;
}

export interface PaymentSearchResponse {
  payments: Payment[];
  total: number;
  page: number;
  pageSize: number;
}
