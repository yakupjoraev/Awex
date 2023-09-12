/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * team member data
 */
export type TeamMember = {
    name?: string | null;
    email: string;
    /**
     * team member permissions
     */
    permissions?: Array<string>;
    /**
     * team member label
     */
    label: string;
    /**
     * true if team member enabled
     */
    enabled?: boolean | null;
    confirmed_at?: number | null;
};
