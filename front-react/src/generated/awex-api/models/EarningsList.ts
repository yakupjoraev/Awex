/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * earnings data
 */
export type EarningsList = {
    /**
     * referral account id for these earnings
     */
    referralId?: number;
    /**
     * earnings accrual date
     */
    createdAt?: number;
    /**
     * active if earnings > 0, inActive otherwise
     */
    type?: EarningsList.type;
    /**
     * earnings amount
     */
    amount?: number;
};

export namespace EarningsList {

    /**
     * active if earnings > 0, inActive otherwise
     */
    export enum type {
        ACTIVE = 'active',
        IN_ACTIVE = 'inActive',
    }


}
