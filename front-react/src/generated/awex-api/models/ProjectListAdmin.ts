/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Project } from "./Project";
import type { ProjectValidationAdmin } from "./ProjectValidationAdmin";

export type ProjectListAdmin = {
  /**
   * record id
   */
  id?: number;
  user_id?: number;
  data?: Project;
  draft?: Project;
  validation_requested_at?: number | null;
  validation?: ProjectValidationAdmin;
};
