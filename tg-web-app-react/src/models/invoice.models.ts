export interface IInvoice {
  name: string;
  price: number;
  currency: string;
  projectId: string;
  feePayee: string;
  isDeposit?: boolean;
  depositAmount?: number;
  depositReturnTime?: number;
  convertTo?: string;
  isTemplate?: boolean;
}
