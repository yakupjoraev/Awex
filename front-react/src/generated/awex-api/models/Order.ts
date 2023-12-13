/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Order = {
    id?: number
    data?: {
        name?: string
        price?: number
        currency?: string
        rate?: number
    }
    deposit?: {
        name?: string
        amount?: number
        currency?: string
        rate?: number
        returnTime?: number
    }
    amount?: number
    depositAmount?: number
    depositReturnTime?: number
    buyerIdentifier?: string
    status?: OrderStatus.status
    createdAt?: number
}

export namespace OrderStatus {

    export enum status {
        WAIT = 'wait',
        PAID = 'paid',
        EXPIRED = 'expired',
    }
}
