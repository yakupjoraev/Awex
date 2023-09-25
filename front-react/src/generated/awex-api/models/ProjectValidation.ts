/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ProjectValidation = {
    /**
     * validation status
     */
    status?: ProjectValidation.status | null;
    /**
     * Data request from administrator
     */
    request?: string | null;
    /**
     * Reason if rejected
     */
    rejectReason?: string | null;
};

export namespace ProjectValidation {

    /**
     * validation status
     */
    export enum status {
        ON_REVIEW = 'onReview',
        WAITING = 'waiting',
        APPROVED = 'approved',
        REJECTED = 'rejected',
    }


}
