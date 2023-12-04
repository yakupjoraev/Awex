/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ProjectData = {
    companyId?: number
    name: string
    description?: string
    feePayee?: boolean
    paymentBills?: boolean
    paymentWeb?: boolean
    paymentTelegram?: boolean
    activity?: string
    convertTo?: string //ProjectData.convertTo
    currency?: string
    cms?: string
    urlWeb?: string
    urlNotification?: string
    urlPaymentSuccess?: string
    urlPaymentFailure?: string
}

export namespace ProjectData {

    export enum convertTo {
        FIAT = 'fiat',
        STABLECOIN = 'stablecoin',
    }
}
