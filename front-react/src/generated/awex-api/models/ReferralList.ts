/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * referral data
 */
export type ReferralList = {
    /**
     * referral account id
     */
    referralId?: number;
    /**
     * registration date
     */
    createdAt?: number;
    /**
     * active if earnings > 0, inActive otherwise
     */
    status?: ReferralList.status;
    /**
     * earnings from this referral
     */
    amount?: number;
};

export namespace ReferralList {

    /**
     * active if earnings > 0, inActive otherwise
     */
    export enum status {
        ACTIVE = 'active',
        IN_ACTIVE = 'inActive',
    }


}
