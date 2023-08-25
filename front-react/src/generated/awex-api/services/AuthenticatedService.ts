/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Notification } from '../models/Notification';
import type { Order } from '../models/Order';
import type { Product } from '../models/Product';
import type { Project } from '../models/Project';
import type { Session } from '../models/Session';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthenticatedService {

    /**
     * endpoint for otp uri requesting
     * otp uri
     * @returns any request succeeded
     * @throws ApiError
     */
    public static otpUri(): CancelablePromise<{
/**
 * google authenticator connection uri for QR generation
 */
uri?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/otp/uri',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for 2FA enabling or disabling
     * 2FA enabling or disabling
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static otpSet(
requestBody: {
/**
 * one time password from google authenticator
 */
otp: string;
/**
 * enable 2FA if true, disable 2FA if false
 */
active: boolean;
},
): CancelablePromise<{
/**
 * request result
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/otp',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for obtaining 2FA state
     * 2FA state
     * @returns any request succeeded
     * @throws ApiError
     */
    public static otpGet(): CancelablePromise<{
/**
 * true if 2FA is enabled, false otherwise
 */
active?: boolean;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/otp',
            errors: {
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for checking google authenticator one time password
     * checking google authenticator one time password
     * @param otp one time password
     * @returns any request succeeded
     * @throws ApiError
     */
    public static otpCheck(
otp: string,
): CancelablePromise<{
/**
 * true if otp is valid, false otherwise
 */
valid?: boolean;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/otp/{otp}',
            path: {
                'otp': otp,
            },
            errors: {
                403: `request failed`,
                404: `request failed`,
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
 * array of whitelisted ip, if empty - whitelisting is disabled
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
 * array of whitelisted ip, if empty - whitelisting is disabled
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
 * array of sessions
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
     * endpoint for getting projects list
     * projects list
     * @param page requested page number
     * @returns any request succeeded
     * @throws ApiError
     */
    public static projectsList(
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
 * array of sessions
 */
list?: Array<Project>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/project',
            query: {
                'page': page,
            },
            errors: {
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for creating project
     * creating project
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static projectCreate(
requestBody: Project,
): CancelablePromise<{
/**
 * request result
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/project',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for getting project
     * getting project
     * @param id project id
     * @returns any request succeeded
     * @throws ApiError
     */
    public static projectGet(
id: string,
): CancelablePromise<{
/**
 * name
 */
name?: string;
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
convertTo?: 'fiat' | 'stablecoin';
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
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/project/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `request failed`,
                404: `request failed`,
            },
        });
    }

    /**
     * endpoint for updating project
     * updating project
     * @param id project id
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static projectUpdate(
id: string,
requestBody: Project,
): CancelablePromise<{
/**
 * request result
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/project/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
                404: `request failed`,
            },
        });
    }

    /**
     * endpoint for deleting project
     * deleting project
     * @param id project id
     * @returns any request succeeded
     * @throws ApiError
     */
    public static projectDelete(
id: string,
): CancelablePromise<{
/**
 * request result description
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/project/{id}/delete',
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
     * endpoint for creating products
     * creating product
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static productCreate(
requestBody: Product,
): CancelablePromise<{
/**
 * request result
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/product',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for getting orders list
     * orders list
     * @param page requested page number
     * @returns any request succeeded
     * @throws ApiError
     */
    public static ordersList(
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
 * array of sessions
 */
list?: Array<Order>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/order',
            query: {
                'page': page,
            },
            errors: {
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for creating order
     * creating order
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static orderCreate(
requestBody: {
/**
 * purchased product identifier
 */
productId?: string;
/**
 * payment type
 */
type?: 'fiat' | 'crypto';
/**
 * optional (for crypto type only), blockchain network identifier
 */
networkId?: string;
/**
 * optional (for crypto type only), asset identifier
 */
coin?: string;
/**
 * number of purchased items
 */
quantity?: number;
},
): CancelablePromise<{
/**
 * request result
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for getting order data
     * getting order data
     * @param id order id
     * @returns any request succeeded
     * @throws ApiError
     */
    public static orderGet(
id: string,
): CancelablePromise<{
/**
 * purchased product id
 */
productId?: number;
/**
 * purchased items quantity
 */
quantity?: number;
/**
 * quantity * product price
 */
amount?: number;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/order/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `request failed`,
                404: `request failed`,
            },
        });
    }

    /**
     * endpoint for getting payment data for order
     * getting payment data for order
     * @param id project id
     * @returns any request succeeded
     * @throws ApiError
     */
    public static orderPaymentGet(
id: string,
): CancelablePromise<{
paymentData?: {
/**
 * payment address
 */
address?: string;
};
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/order/{id}/payment',
            path: {
                'id': id,
            },
            errors: {
                403: `request failed`,
                404: `request failed`,
            },
        });
    }

}
