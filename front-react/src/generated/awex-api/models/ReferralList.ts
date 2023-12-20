/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * referral data
 */
export type ReferralList = {
    referralId?: number
    createdAt?: number
    status?: ReferralList.status
    amount?: number
};

export namespace ReferralList {

    export enum status {
        ACTIVE = 'active',
        IN_ACTIVE = 'inActive',
    }
}
