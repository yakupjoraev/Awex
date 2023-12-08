/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyItem } from "./CompanyItem";
import type { Project } from "./Project";
import type { ProjectValidationAdmin } from "./ProjectValidationAdmin";

export type ProjectItemAdmin = {
  /**
   * user id
   */
  userId?: number;
  data?: Project;
  draft?: Project;
  company?: CompanyItem;
  /**
   * UNIX timestamp, time when request was sent
   */
  validationRequestedAt?: number | null;
  validation?: ProjectValidationAdmin;
};
