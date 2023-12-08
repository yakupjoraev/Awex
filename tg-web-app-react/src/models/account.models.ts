export interface ITransaction {
  id: number;
  orderId: number;
  date: number;
  userId: number;
  type: string;
  class: string;
  paymentOrderAmount: number;
  paymentDepositAmount: number;
  paymentTotalAmount: number;
  paymentFeeAmount: number;
  currency: string;
  invoice: string;
  details: string;
  projectId: number;
}
