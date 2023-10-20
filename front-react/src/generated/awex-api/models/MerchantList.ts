/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProfileData } from './ProfileData';

/**
 * user data
 */
export type MerchantList = {
    /**
     * user id
     */
    id?: number;
    /**
     * user email
     */
    email?: string;
    data?: ProfileData;
    /**
     * if false - user is blocked
     */
    enabled?: boolean;
    /**
     * individual fee
     */
    fee?: number;
    /**
     * UTC timestamp
     */
    createdAt?: number;
};
