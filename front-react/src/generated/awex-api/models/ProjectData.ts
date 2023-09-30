/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ProjectData = {
    companyId?: number;
    /**
     * name
     */
    name: string;
    /**
     * description
     */
    description?: string;
    /**
     * true is merchant is fee payee
     */
    feePayee?: boolean;
    /**
     * true if payment bills are enabled
     */
    paymentBills?: boolean;
    /**
     * true if web payments are enabled
     */
    paymentWeb?: boolean;
    /**
     * true if telegram payments are enabled
     */
    paymentTelegram?: boolean;
    /**
     * activity
     */
    activity?: string;
    /**
     * currency for payments to be converted to
     */
    convertTo?: ProjectData.convertTo;
    /**
     * currency
     */
    currency?: string;
    /**
     * cms
     */
    cms?: string;
    /**
     * web url
     */
    urlWeb?: string;
    /**
     * notification url
     */
    urlNotification?: string;
    /**
     * Success payment hook url
     */
    urlPaymentSuccess?: string;
    /**
     * Failure payment hook url
     */
    urlPaymentFailure?: string;
};

export namespace ProjectData {

    /**
     * currency for payments to be converted to
     */
    export enum convertTo {
        FIAT = 'fiat',
        STABLECOIN = 'stablecoin',
    }


}
