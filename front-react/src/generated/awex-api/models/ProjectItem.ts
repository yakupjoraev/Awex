/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Project } from './Project';
import type { ProjectValidation } from './ProjectValidation';

export type ProjectItem = {
    data?: Project;
    draft?: Project;
    /**
     * UNIX timestamp, time when request was sent
     */
    validationRequestedAt?: number | null;
    validation?: ProjectValidation;
};
