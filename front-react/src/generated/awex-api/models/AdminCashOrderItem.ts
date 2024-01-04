/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AdminCashOrder = {
  address: string;
  amount: number;
  companyName: string;
  courierName: string;
  courierPhone: string;
  courierDocument: string;
  currency: string;
};

export type AdminCashOrderItem = {
  completedAt?: number;
  createdAt?: number;
  data: AdminCashOrder;
  id: number;
  officeId: number;
};
