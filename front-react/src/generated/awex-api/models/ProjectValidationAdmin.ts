/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ProjectValidationAdmin = {
    /**
     * validation status
     */
    status?: ProjectValidationAdmin.status | null;
    /**
     * Data request from administrator
     */
    request?: string | null;
    reject?: {
/**
 * reject reason
 */
reason?: string;
/**
 * administrator id
 */
userId?: number;
/**
 * UNIX timestamp, time of rejection
 */
timestamp?: number;
} | null;
    approve?: {
/**
 * administrator id
 */
userId?: number;
/**
 * UNIX timestamp, time of approval
 */
timestamp?: number;
} | null;
};

export namespace ProjectValidationAdmin {

    /**
     * validation status
     */
    export enum status {
        NEW = 'new',
        READ = 'read',
        WAIT = 'wait',
        APPROVED = 'approved',
        REJECTED = 'rejected',
    }


}
