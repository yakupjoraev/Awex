/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CommonService {

    /**
     * API Information
     * @returns any API Information
     * @throws ApiError
     */
    public static info(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }

    /**
     * endpoint for user registration
     * User registration
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static registration(
requestBody: {
/**
 * password
 */
password: string;
/**
 * email
 */
email: string;
},
): CancelablePromise<{
/**
 * request result
 */
message?: string;
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

    /**
     * endpoint for user authentication
     * User login
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static login(
requestBody: {
/**
 * password
 */
password: string;
/**
 * email
 */
email: string;
},
): CancelablePromise<{
/**
 * either email is verified or not, if true - jwt token is provided
 */
verified?: boolean;
/**
 * is provided only if email is verified should be used in "Authorization" header ( "Bearer token" ) for non common endpoints
 */
token?: string;
/**
 * unix timestamp until token is valid
 */
expiration?: number;
/**
 * optional, request result
 */
message?: string;
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

    /**
     * endpoint for password strength check
     * password strength check
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static passwordStrength(
requestBody: {
/**
 * password
 */
password: string;
},
): CancelablePromise<{
/**
 * password strength score (0, 1, 2, 3)
 */
score?: number;
/**
 * password strength description (very weak, weak, medium, strong)
 */
strength?: string;
/**
 * true if valid for usage in application (medium, strong)
 */
valid?: boolean;
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

    /**
     * endpoint for email confirmation
     * email confirmation
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static confirm(
requestBody: {
/**
 * confirmation code from link in email message
 */
code: string;
},
): CancelablePromise<{
/**
 * request result
 */
message?: string;
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

    /**
     * endpoint for confirmation email resending request
     * confirmation email resending request
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static resend(
requestBody: {
/**
 * email
 */
email: string;
},
): CancelablePromise<{
/**
 * request result
 */
message?: string;
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

    /**
     * endpoint for password reset email sending request
     * password reset email sending request
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static send(
requestBody: {
/**
 * email
 */
email: string;
},
): CancelablePromise<{
/**
 * request result
 */
message?: string;
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

    /**
     * endpoint for reset token obtaining
     * reset token obtaining
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static resetConfirm(
requestBody: {
/**
 * reset code from link in email message
 */
code: string;
},
): CancelablePromise<{
/**
 * should be used for password reset life time 1 hour
 */
resetToken?: string;
/**
 * request result
 */
message?: string;
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

    /**
     * endpoint for password reset
     * password reset
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static passwordReset(
requestBody: {
/**
 * password
 */
resetToken: string;
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
            url: '/account/auth/reset/set',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
            },
        });
    }

}
