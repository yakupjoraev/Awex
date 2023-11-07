/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Notification } from '../models/Notification';
import type { ProfileData } from '../models/ProfileData';
import type { Session } from '../models/Session';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthenticatedService {

    /**
     * endpoint for setting google authenticator as 2fa method
     * set google authenticator
     * @returns any request succeeded
     * @throws ApiError
     */
    public static setGoogleAuthenticator(): CancelablePromise<{
        /**
         * google authenticator connection uri for QR generation
         */
        uri?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/otp/set-google-authenticator',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for setting gmail as 2fa method
     * set gmail
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static setGmail(
        requestBody: {
            /**
             * gmail account e-mail
             */
            email: string;
        },
    ): CancelablePromise<{
        /**
         * request result description
         */
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/otp/set-gmail',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for setting facebook as 2fa method
     * set facebook
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static setFacebook(
        requestBody: {
            /**
             * code or access token obtained by the frontend
             */
            otp: string;
        },
    ): CancelablePromise<{
        /**
         * request result description
         */
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/otp/set-facebook',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for enabling 2fa method
     * enabling 2fa method
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static otpEnable(
        requestBody: {
            /**
             * 2fa type
             */
            _2faType: 'googleAuthenticator' | 'gmail' | 'facebook';
            /**
             * code or access token obtained by the frontend
             */
            otp: string;
        },
    ): CancelablePromise<{
        /**
         * request result description
         */
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/otp/enable',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for disabling 2fa method
     * disabling 2fa method
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static otpDisable(
        requestBody: {
            /**
             * 2fa type
             */
            _2faType: 'googleAuthenticator' | 'gmail' | 'facebook';
        },
    ): CancelablePromise<{
        /**
         * request result description
         */
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/otp/disable',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for getting of the list of enabled 2fa methods
     * list of enabled 2fa methods
     * @returns string request succeeded
     * @throws ApiError
     */
    public static otpEnabled(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/otp/enabled',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for validating of the otp code
     * validating of the otp code
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static otpValidate(
        requestBody: {
            /**
             * 2fa type
             */
            _2faType: 'googleAuthenticator' | 'gmail' | 'facebook';
            /**
             * one time password or facebook token
             */
            otp: string;
        },
    ): CancelablePromise<{
        /**
         * request result description
         */
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/otp/validate',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for sending otp to the gmail
     * sending otp to the gmail
     * @returns any request succeeded
     * @throws ApiError
     */
    public static sendGmail(): CancelablePromise<{
        /**
         * request result description
         */
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/otp/send-gmail',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for second 2fa step
     * second 2fa step
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static otpLogin(
        requestBody: {
            /**
             * 2fa type
             */
            _2faType: 'googleAuthenticator' | 'gmail' | 'facebook';
            /**
             * code or access token obtained by the frontend
             */
            otp: string;
        },
    ): CancelablePromise<{
        /**
         * request result description
         */
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/otp/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for setting ip whitelist
     * setting ip whitelist
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static ipSet(
        requestBody: {
            /**
             * list of whitelisted ip, if empty - whitelisting is disabled
             */
            ipWhitelist: Array<string>;
        },
    ): CancelablePromise<{
        /**
         * request result
         */
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/ip',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for getting ip whitelist
     * ip whitelist
     * @returns any request succeeded
     * @throws ApiError
     */
    public static ipGet(): CancelablePromise<{
        /**
         * current ip address
         */
        ip?: string;
        /**
         * list of whitelisted ip, if empty - whitelisting is disabled
         */
        ipWhitelist?: Array<string>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/ip',
            errors: {
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for getting sessions list
     * sessions list
     * @param page requested page number
     * @returns any request succeeded
     * @throws ApiError
     */
    public static sessionList(
        page?: string,
    ): CancelablePromise<{
        /**
         * current page number
         */
        page?: number;
        /**
         * pages number
         */
        pages?: number;
        /**
         * list of sessions
         */
        list?: Array<Session>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/session/list',
            query: {
                'page': page,
            },
            errors: {
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for deleting user session
     * deleting user session
     * @param id session id
     * @returns any request succeeded
     * @throws ApiError
     */
    public static sessionDelete(
        id: string,
    ): CancelablePromise<{
        /**
         * request result description
         */
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/session/{id}/delete',
            path: {
                'id': id,
            },
            errors: {
                400: `request failed`,
                403: `request failed`,
                404: `request failed`,
            },
        });
    }

    /**
     * endpoint for deleting all user sessions except current
     * deleting user sessions except current
     * @returns any request succeeded
     * @throws ApiError
     */
    public static sessionDeleteAll(): CancelablePromise<{
        /**
         * request result description
         */
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/session/delete',
            errors: {
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for setting new password
     * password set
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static passwordSet(
        requestBody: {
            /**
             * old password
             */
            oldPassword: string;
            /**
             * new password
             */
            password: string;
        },
    ): CancelablePromise<{
        /**
         * request result
         */
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/profile/set-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for updating user profile data
     * updating user profile data
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static profileSet(
        requestBody: ProfileData,
    ): CancelablePromise<{
        /**
         * request result
         */
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/profile',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for getting user profile data
     * getting user profile data
     * @returns ProfileData request succeeded
     * @throws ApiError
     */
    public static profileGet(): CancelablePromise<ProfileData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/profile',
            errors: {
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for updating notifications settings
     * updating notifications settings
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static notificationsSet(
        requestBody: Notification,
    ): CancelablePromise<{
        /**
         * request result
         */
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/profile/notifications',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for getting notifications settings
     * getting notifications settings
     * @returns Notification request succeeded
     * @throws ApiError
     */
    public static notificationsGet(): CancelablePromise<Notification> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/profile/notifications',
            errors: {
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for updating currency for displaying balance
     * updating currency for displaying balance
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static currencySet(
        requestBody: {
            /**
             * currency for displaying balance
             */
            currency?: string;
        },
    ): CancelablePromise<{
        /**
         * request result
         */
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/profile/currency',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for getting currency for displaying balance
     * getting currency for displaying balance
     * @returns any request succeeded
     * @throws ApiError
     */
    public static currencyGet(): CancelablePromise<{
        /**
         * currency for displaying balance
         */
        currency?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/profile/currency',
            errors: {
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for getting account settings (currencies list, permissions list, countries list, labels list etc.)
     * getting settings list
     * @returns any request succeeded
     * @throws ApiError
     */
    public static settingsList(): CancelablePromise<{
        countries?: Array<string>;
        permissions?: Array<string>;
        labels?: Array<string>;
        roles?: Array<string>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/config/settings',
            errors: {
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for getting referral link
     * getting referral link
     * @returns any request succeeded
     * @throws ApiError
     */
    public static referralLink(): CancelablePromise<{
        /**
         * code for referral link building
         */
        referralCode?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/referral/link',
            errors: {
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for getting referral statistics
     * getting referral statistics
     * @returns any request succeeded
     * @throws ApiError
     */
    public static referralStatistics(): CancelablePromise<{
        totalReferralsNumber?: number;
        activeReferralsNumber?: number;
        earnings?: number;
        referralFees?: {
            /**
             * referral fees percentage for a "fromFees" type
             */
            fromFees?: number;
            /**
             * referral fees percentage for a "fromTurnover" type
             */
            fromTurnover?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/referral/statistics',
            errors: {
                403: `request failed`,
            },
        });
    }

    /**
     * admin endpoint for getting referral fees
     * getting referral fees
     * @returns any request succeeded
     * @throws ApiError
     */
    public static adminGetReferralFees(): CancelablePromise<{
        /**
         * referral fees percentage for a "fromFees" type
         */
        fromFees?: number;
        /**
         * referral fees percentage for a "fromTurnover" type
         */
        fromTurnover?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/referral/admin/fees',
            errors: {
                403: `request failed`,
            },
        });
    }
}