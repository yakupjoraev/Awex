/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Project } from './Project'
import type { ProjectValidation } from './ProjectValidation'

export type ProjectItem = {
    companyId?: number
    data?: Project
    draft?: Project
    validationRequestedAt?: number | null
    validation?: ProjectValidation | null
};
