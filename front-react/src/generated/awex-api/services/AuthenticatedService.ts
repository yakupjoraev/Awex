/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Notification } from '../models/Notification';
import type { Order } from '../models/Order';
import type { ProfileData } from '../models/ProfileData';
import type { Project } from '../models/Project';
import type { Session } from '../models/Session';
import type { TeamMember } from '../models/TeamMember';

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
            url: '/account/otp/account/otp/set-google-authenticator',
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
            url: '/account/otp/account/otp/set-gmail',
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
            url: '/account/otp/account/otp/set-facebook',
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
            url: '/account/otp/account/otp/enable',
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
            url: '/account/otp/account/otp/disable',
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
            url: '/account/otp/account/otp/enabled',
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
            url: '/account/otp/account/otp/validate',
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
            url: '/account/otp/account/otp/send-gmail',
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
            url: '/account/otp/account/otp/login',
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
currencies?: Array<string>;
countries?: Array<string>;
permissions?: Array<string>;
labels?: Array<string>;
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
     * endpoint for getting team members list
     * team members list
     * @param page requested page number
     * @returns any request succeeded
     * @throws ApiError
     */
    public static teamMembersList(
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
 * list of projects
 */
list?: Array<TeamMember>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/team',
            query: {
                'page': page,
            },
            errors: {
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for team members adding
     * team members adding
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static teamMembersAdd(
requestBody: TeamMember,
): CancelablePromise<{
/**
 * request result
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/team',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for getting team member
     * getting team member
     * @param id team membership id
     * @returns TeamMember request succeeded
     * @throws ApiError
     */
    public static teamMemberGet(
id: string,
): CancelablePromise<TeamMember> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/team/{id}',
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
     * endpoint for team member settings updating
     * team member settings updating
     * @param id project id
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static teamMemberSet(
id: string,
requestBody: {
/**
 * team member permissions
 */
permissions?: Array<string>;
/**
 * team member label
 */
label?: string;
},
): CancelablePromise<{
/**
 * request result
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/team/{id}',
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
     * endpoint for a team member enabling
     * team member enabling
     * @param id team member id
     * @returns any request succeeded
     * @throws ApiError
     */
    public static teamMemberEnable(
id: string,
): CancelablePromise<{
/**
 * request result description
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/team/{id}/enable',
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
     * endpoint for a team member disabling
     * team member disabling
     * @param id team member id
     * @returns any request succeeded
     * @throws ApiError
     */
    public static teamMemberDisable(
id: string,
): CancelablePromise<{
/**
 * request result description
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/team/{id}/disable',
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
     * endpoint for a team member deleting
     * team member deleting
     * @param id team member id
     * @returns any request succeeded
     * @throws ApiError
     */
    public static teamMemberDelete(
id: string,
): CancelablePromise<{
/**
 * request result description
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/team/{id}/delete',
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
 * list of projects
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
data?: {
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
};
draft?: {
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
};
/**
 * timestamp of the validation request
 */
validationRequestedAt?: number;
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
     * endpoint for sending project for validation
     * sending project for validation
     * @param id project id
     * @returns any request succeeded
     * @throws ApiError
     */
    public static projectValidate(
id: string,
): CancelablePromise<{
/**
 * request result
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/project/{id}/request-validation',
            path: {
                'id': id,
            },
            errors: {
                400: `request failed`,
                403: `request failed`,
                404: `request failed`,
                409: `request failed`,
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
 * list of orders
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
 * order name
 */
name: string;
/**
 * order price in specified currency
 */
price: number;
/**
 * price currency, | payment amount will be recalculated to USDT
 */
currency: string;
/**
 * project identifier
 */
projectId?: number;
/**
 * buyer identifier for reference
 */
buyerIdentifier?: string;
},
): CancelablePromise<{
/**
 * created order id
 */
id?: number;
/**
 * created order unique identifier for buyers
 */
uniqueId?: string;
/**
 * request result
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order/invoice',
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
 * order name
 */
name?: string;
/**
 * created order unique identifier for buyers
 */
uniqueId?: string;
/**
 * quantity * product price
 */
amount?: number;
/**
 * buyer identifier for reference
 */
buyerIdentifier?: string;
data?: Record<string, any>;
payment_data?: Record<string, any>;
/**
 * true if order is paid
 */
paid?: boolean;
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

}
