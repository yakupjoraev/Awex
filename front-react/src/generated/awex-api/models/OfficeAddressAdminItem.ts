/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { ProjectValidationAdmin } from "./ProjectValidationAdmin";

export type OfficeAddressAdminItem = {
  /**
   * record id
   */
  id?: number;
  userId?: number;
  data?: {
    companyName: string;
    userFiles?: string[];
    adminFiles?: string[];
  };
  address: string;
  validation_requested_at?: number | null;
  validation?: ProjectValidationAdmin;
  createdAt: number;
};
