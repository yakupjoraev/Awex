/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProfileData } from './ProfileData';

/**
 * user data
 */
export type AdminList = {
    /**
     * user id
     */
    id?: number;
    /**
     * user email
     */
    email?: string;
    roles?: Array<string>;
    data?: ProfileData;
    /**
     * if false - user is blocked
     */
    enabled?: boolean;
    /**
     * UTC timestamp
     */
    createdAt?: number;
};
