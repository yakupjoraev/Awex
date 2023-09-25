/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProjectItemAdmin } from '../models/ProjectItemAdmin';
import type { ProjectListAdmin } from '../models/ProjectListAdmin';
import type { UserItem } from '../models/UserItem';
import type { UserList } from '../models/UserList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthorizedService {

    /**
     * endpoint for a fee getting
     * fee getting
     * @returns any request succeeded
     * @throws ApiError
     */
    public static feeGet(): CancelablePromise<{
/**
 * current fee
 */
current?: number;
/**
 * upcoming fee
 */
next?: number | null;
/**
 * UNIX timestamp, time when upcoming fee will be active
 */
nextTimestamp?: number | null;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fee',
            errors: {
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for a fee setting
     * fee setting
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static feeSet(
requestBody: {
/**
 * new fee
 */
fee: number;
/**
 * UNIX timestamp, time when new fee should be enabled
 */
timestamp: number;
},
): CancelablePromise<{
/**
 * request result description
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/fee',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for a personal fee getting
     * personal fee getting
     * @param id user id
     * @returns any request succeeded
     * @throws ApiError
     */
    public static personalFeeGet(
id: string,
): CancelablePromise<{
/**
 * current fee
 */
current?: number;
/**
 * upcoming fee
 */
next?: number | null;
/**
 * UNIX timestamp, time when upcoming fee will be active
 */
nextTimestamp?: number | null;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/fee/{id}',
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
     * endpoint for a personal fee setting
     * personal fee setting
     * @param id user id
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static personalFeeSet(
id: string,
requestBody: {
/**
 * new fee
 */
fee: number;
/**
 * UNIX timestamp, time when new fee should be enabled
 */
timestamp: number;
},
): CancelablePromise<{
/**
 * request result
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/fee/{id}',
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
     * administrator endpoint for getting projects list
     * administrator projects list
     * @param page requested page number
     * @param status validation status
     * @param search search string (merchant id, name, inn, address)
     * @returns any request succeeded
     * @throws ApiError
     */
    public static adminProjectsList(
page?: string,
status?: string,
search?: string,
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
list?: Array<ProjectListAdmin>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/project/admin',
            query: {
                'page': page,
                'status': status,
                'search': search,
            },
            errors: {
                403: `request failed`,
            },
        });
    }

    /**
     * administrator endpoint for getting project
     * administrator getting project (resource state can be changed)
     * @param id project id
     * @returns ProjectItemAdmin request succeeded
     * @throws ApiError
     */
    public static administratorProjectGet(
id: string,
): CancelablePromise<ProjectItemAdmin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/project/{id}/admin',
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
     * administrator endpoint for requesting additional data
     * requesting additional data by administrator
     * @param id project id
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static administratorProjectRequest(
id: string,
requestBody: {
/**
 * additional data request
 */
request: string;
},
): CancelablePromise<{
/**
 * request result
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/project/{id}/admin/request',
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
     * administrator endpoint for approving of the validation request
     * approving of the validation request
     * @param id project id
     * @returns any request succeeded
     * @throws ApiError
     */
    public static administratorProjectApprove(
id: string,
): CancelablePromise<{
/**
 * request result
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/project/{id}/admin/approve',
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
     * administrator endpoint for rejection of the validation request
     * rejection of the validation request
     * @param id project id
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static administratorProjectReject(
id: string,
requestBody: {
/**
 * rejection reason
 */
reason: string;
},
): CancelablePromise<{
/**
 * request result
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/project/{id}/admin/reject',
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
     * administrator endpoint for getting validation statuses list
     * administrator projects validation statuses list
     * @returns string request succeeded
     * @throws ApiError
     */
    public static adminProjectsStatusesList(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/project/admin/statuses',
            errors: {
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for getting administrators list
     * administrators list
     * @param page requested page number
     * @param search email, id or name
     * @param role admin role
     * @returns any request succeeded
     * @throws ApiError
     */
    public static adminList(
page?: string,
search?: string,
role?: string,
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
list?: Array<UserList>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/admin',
            query: {
                'page': page,
                'search': search,
                'role': role,
            },
            errors: {
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for getting user details
     * getting user details
     * @param id user id
     * @returns UserItem request succeeded
     * @throws ApiError
     */
    public static adminGet(
id: string,
): CancelablePromise<UserItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/account/{id}/admin',
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
     * endpoint for granting admin roles to user
     * granting admin roles to user
     * @param id project id
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static adminUpdate(
id: string,
requestBody: {
roles?: Array<string>;
},
): CancelablePromise<{
/**
 * request result
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/{id}/admin',
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
     * endpoint for enabling user account
     * enabling user account
     * @param id project id
     * @returns any request succeeded
     * @throws ApiError
     */
    public static adminEnable(
id: string,
): CancelablePromise<{
/**
 * request result
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/{id}/admin/enable',
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
     * endpoint for disabling user account
     * disabling user account
     * @param id project id
     * @returns any request succeeded
     * @throws ApiError
     */
    public static adminDisable(
id: string,
): CancelablePromise<{
/**
 * request result
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/account/{id}/admin/disable',
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

}
