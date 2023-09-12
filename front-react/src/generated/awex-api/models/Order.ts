/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Order = {
    /**
     * order id
     */
    id?: number;
    /**
     * order data
     */
    data?: {
/**
 * order name
 */
name?: string;
/**
 * order price in specified currency
 */
price?: number;
/**
 * order currency
 */
currency?: string;
/**
 * order currency rate to USDT
 */
rate?: number;
};
    /**
     * price * rate
     */
    amount?: number;
    /**
     * buyer identifier for reference
     */
    buyerIdentifier?: string;
};
