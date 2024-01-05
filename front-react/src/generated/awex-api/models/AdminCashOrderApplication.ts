/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { AdminCashOrder } from "./AdminCashOrderItem";

export type AdminCashOrderApplication = {
  officeId: number;
  data: AdminCashOrder;
  complete?: {
    admin: number;
  } | null;
  completedAt?: number;
};
