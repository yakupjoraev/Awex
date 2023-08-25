/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Session = {
    /**
     * session id
     */
    id?: number;
    /**
     * session data
     */
    data?: {
/**
 * browser and os data of request when session was created
 */
browser?: Record<string, any>;
/**
 * ip of request when session was created
 */
ip?: string;
/**
 * browser and os data of request when session was created
 */
geo?: Record<string, any>;
};
};
