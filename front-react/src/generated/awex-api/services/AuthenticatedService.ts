import type { Notification } from '../models/Notification'
import type { ProfileData } from '../models/ProfileData'
import type { Session } from '../models/Session'

import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'

export class AuthenticatedService {
    public static setGoogleAuthenticator(): CancelablePromise<{
        uri?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/otp/set-google-authenticator',
            errors: {
                400: `request failed`,
                403: `Forbidden`,
            },
        })
    }

    public static setGmail(
        requestBody: {
            email: string
        },
    ): CancelablePromise<{
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/otp/set-gmail',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `Forbidden`,
            },
        })
    }

    public static setFacebook(
        requestBody: {
            otp: string
        },
    ): CancelablePromise<{
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/otp/set-facebook',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `Forbidden`,
            },
        })
    }

    public static otpEnable(
        requestBody: {
            _2faType: 'googleAuthenticator' | 'gmail' | 'facebook'
            otp: string
        },
    ): CancelablePromise<{
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/otp/enable',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `Forbidden`,
            },
        })
    }

    public static otpDisable(
        requestBody: {
            _2faType: 'googleAuthenticator' | 'gmail' | 'facebook'
        },
    ): CancelablePromise<{
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/otp/disable',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `Forbidden`,
            },
        })
    }

    public static otpEnabled(): CancelablePromise<{
        enabled: Array<string>
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/otp/enabled',
            errors: {
                400: `request failed`,
                403: `Forbidden`,
            },
        })
    }

    public static otpValidate(
        requestBody: {
            _2faType: 'googleAuthenticator' | 'gmail' | 'facebook'
            otp: string
        },
    ): CancelablePromise<{
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/otp/validate',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `Forbidden`,
            },
        })
    }

    public static sendGmail(): CancelablePromise<{
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/otp/send-gmail',
            errors: {
                400: `request failed`,
                403: `Forbidden`,
            },
        })
    }

    public static otpLogin(
        requestBody: {
            _2faType: 'googleAuthenticator' | 'gmail' | 'facebook'
            otp: string
        },
    ): CancelablePromise<{
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/otp/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `Forbidden`,
            },
        })
    }

    public static ipSet(
        requestBody: {
            ipWhitelist: Array<string>
        },
    ): CancelablePromise<{
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/ip',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `Forbidden`,
            },
        })
    }

    public static ipGet(): CancelablePromise<{
        ip?: string
        ipWhitelist?: Array<string>
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/ip',
            errors: {
                403: `Forbidden`,
            },
        })
    }

    public static sessionList(
        page?: string,
    ): CancelablePromise<{
        page?: number
        pages?: number
        list?: Array<Session>
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/session/list',
            query: {
                'page': page,
            },
            errors: {
                403: `Forbidden`,
            },
        });
    }

    public static sessionDelete(
        id: string,
    ): CancelablePromise<{
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/session/{id}/delete',
            path: {
                'id': id,
            },
            errors: {
                400: `request failed`,
                403: `Forbidden`,
                404: `request failed`,
            },
        })
    }

    public static sessionDeleteAll(): CancelablePromise<{
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/session/delete',
            errors: {
                403: `Forbidden`,
            },
        })
    }

    public static passwordSet(
        requestBody: {
            oldPassword: string
            password: string
        },
    ): CancelablePromise<{
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/profile/set-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `Forbidden`,
            },
        })
    }

    public static profileSet(
        requestBody: ProfileData,
    ): CancelablePromise<{
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/profile',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `Forbidden`,
            },
        })
    }

    public static profileGet(): CancelablePromise<ProfileData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/profile',
            errors: {
                403: `Forbidden`,
            },
        })
    }

    public static notificationsSet(
        requestBody: Notification,
    ): CancelablePromise<{
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/profile/notifications',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `Forbidden`,
            },
        });
    }

    public static notificationsGet(): CancelablePromise<Notification> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/profile/notifications',
            errors: {
                403: `Forbidden`,
            },
        })
    }

    public static currencySet(
        requestBody: {
            currency?: string
        },
    ): CancelablePromise<{
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/profile/currency',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `Forbidden`,
            },
        })
    }

    public static currencyGet(): CancelablePromise<{
        currency?: string
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/profile/currency',
            errors: {
                403: `Forbidden`,
            },
        })
    }

    public static settingsList(): CancelablePromise<{
        countries?: Array<string>
        permissions?: Array<string>
        labels?: Array<string>
        roles?: Array<string>
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/config/settings',
            errors: {
                403: `Forbidden`,
            },
        })
    }

    public static referralLink(): CancelablePromise<{
        referralCode?: string
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/referral/link',
            errors: {
                403: `Forbidden`,
            },
        })
    }

    public static referralStatistics(): CancelablePromise<{
        totalReferralsNumber?: number
        activeReferralsNumber?: number
        earnings?: number
        referralFees?: {
            fromFees?: number
            fromTurnover?: number
        }
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/referral/statistics',
            errors: {
                403: `Forbidden`,
            },
        })
    }

    public static adminGetReferralFees(): CancelablePromise<{
        fromFees?: number
        fromTurnover?: number
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/referral/admin/fees',
            errors: {
                403: `Forbidden`,
            },
        })
    }
    
    public static accountBalance(): CancelablePromise<{
        balance: string
        currency: string
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/balance',
            errors: {
                403: `Forbidden`,
            },
        });
    }

    public static getAccountNotifications(parameters: {
        page?: string
        read?: boolean | string
        projectId?: string
        startTime?:string
        endTime?: string
    }): CancelablePromise<{
        list: Array<{
            id: number
            type: string
            short?: string
            message: string
            read: boolean
            createdAt?: number
            data: {
                projectId: number
            }
        }>
        page: number
        pages: number
        count: number
        unread: number
    }> {
        const { page, read, projectId, startTime, endTime } = parameters
        
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/notifications',
            query: {
                'page': page,
                'read': read,
                'projectId': projectId,
                'startTime': startTime,
                'endTime': endTime,
            },
            errors: {
                403: 'request failed',
            }
        })
    }

    public static setAccountNotifications(
        notificationID: string,
        status: boolean
    ): CancelablePromise<{
        message?: string
    }> {
        const requestBody = {
            read: status
        }

        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/notifications/{id}',
            path: {
                'id': notificationID,
            },
            body: requestBody,
            errors: {
                400: `request failed`,
                403: `Forbidden`,
            },
        })
    }

    public static getAccountNotificationsTypes(): CancelablePromise<{
        types: string[]
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/notifications/types',
            errors: {
                403: 'request failed',
            }
        })
    }

    public static accountProfileCurrencies(): CancelablePromise<{
        currencies: string[]
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/profile/currencies',
            errors: {
                403: 'request failed',
            }
            
        })
    }

    public static accountProfileSetSecret(
        secret: string,
        oldSecret?: string
    ): CancelablePromise<{
        message?: string
    }> {
        const requestBody = {
            oldSecret,
            secret
        }

        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/profile/set-secret',
            body: requestBody,
            errors: {
                400: `request failed`,
                403: `Forbidden`,
            },
        })
    }

    public static accountProfileCheckSecret(): CancelablePromise<{
        isSet: boolean
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/profile/check-secret',
            errors: {
                403: 'request failed',
            }
            
        })
    }
}