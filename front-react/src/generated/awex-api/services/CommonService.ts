import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'

export class CommonService {
    public static info(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }

    public static registration(
        requestBody: {
            password: string
            email: string
        },
    ): CancelablePromise<{
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
            },
        });
    }

    public static login(
        requestBody: {
            password: string
            email: string
        },
    ): CancelablePromise<{
        verified?: boolean
        token?: string
        expiration?: number
        otpRequired?: boolean
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/auth/sign-in',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
            },
        });
    }

    public static passwordStrength(
        requestBody: {
            password: string
        },
    ): CancelablePromise<{
        score?: number
        strength?: string
        valid?: boolean
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/auth/password-strength',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
            },
        });
    }

    public static confirm(
        requestBody: {
            code: string
        },
    ): CancelablePromise<{
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/auth/confirm',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
            },
        });
    }

    public static resend(
        requestBody: {
            email: string
        },
    ): CancelablePromise<{
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/auth/resend',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
            },
        });
    }

    public static send(
        requestBody: {
            email: string
        },
    ): CancelablePromise<{
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/auth/reset/send',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                409: `request failed`,
            },
        });
    }

    public static resetConfirm(
        requestBody: {
            code: string
        },
    ): CancelablePromise<{
        resetToken?: string
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/auth/reset/confirm',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
            },
        });
    }

    public static passwordReset(
        requestBody: {
            resetToken: string
            oldPassword: string
            password: string
        },
    ): CancelablePromise<{
        message?: string
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/auth/reset/set',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
            },
        });
    }

    public static teamMembershipConfirmation(
        requestBody: {
            code: string
        },
        ): CancelablePromise<{
            message?: string
        }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/team/confirm',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
                404: `request failed`,
            },
        });
    }

    public static orderPaymentGet(
        uniqueId: string
    ): CancelablePromise<{
        amount?: number
        depositAmount: number
        depositReturnTime: number
        expiredDate: number
        expired: boolean
        name?: string
        paid: boolean
        projectName: string
        merchantName: string
        paymentData?: {
            type: string
            chain: string
            currency: string
            paymentAmount: string
            address: string
            fee: string
        }
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/order/payment/{uniqueId}',
            path: {
                'uniqueId': uniqueId,
            },
            errors: {
                403: `request failed`,
                404: `request failed`,
            },
        });
    }

    public static orderPaymentSet(
        uniqueId: string,
        requestBody: {
            type: string //'fiat' | 'crypto'
            currency: string
            chain: string
            depositWithdrawCurrency: string
            depositWithdrawChain: string
            depositWithdrawAddress: string
        },
    ): CancelablePromise<{
        amount?: number
        paymentData?: {
            type: string,
            paymentAmount: string
            currency: string
            chain: string
            address: string
            fee: string
        }
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/payment/{uniqueId}',
            path: {
                'uniqueId': uniqueId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        })
    }

    public static orderPaymentWithdrawCurrencies(): CancelablePromise<{
        currencies: Array<{
            currency: string
            name: string
            rate: string
            chain: string
            chainName: string
        }>
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/order/payment/withdraw-currencies',
            errors: {
                403: `request failed`,
            },
        })
    }

    public static paymentCurrencies(
        amount?: string,
    ): CancelablePromise<{
        currencies?: Array<{
            currency: string
            name: string
            rate: string
            chain: string
            chainName: string
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/order/payment/currencies',
            query: {
                'amount': amount,
            },
            errors: {
                403: `request failed`,
            },
        });
    }

    public static paymentUsdtRate(
        amount: string,
        rate: string,
    ): CancelablePromise<{
        currencies?: Array<{
            currency?: string
            name?: string
            rate?: string
        }>
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/order/payment/usdt-rate',
            query: {
                'amount': amount,
                'rate': rate,
            },
            errors: {
                403: `request failed`,
            },
        });
    }

}