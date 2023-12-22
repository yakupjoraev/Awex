/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Project } from './Project'
import type { ProjectValidation } from './ProjectValidation'

export type ProjectList = {
    id?: number
    data?: Project
    draft?: Project
    created_at?: number
    validationRequestedAt?: number | null
    companyId?: number
    validation?: ProjectValidation | null
};
