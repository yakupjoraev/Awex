/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyItem } from '../models/CompanyItem';
import type { CompanyList } from '../models/CompanyList';
import type { Order } from '../models/Order';
import type { Project } from '../models/Project';
import type { ProjectItem } from '../models/ProjectItem';
import type { ProjectItemAdmin } from '../models/ProjectItemAdmin';
import type { ProjectList } from '../models/ProjectList';
import type { ProjectListAdmin } from '../models/ProjectListAdmin';
import type { Statistics } from '../models/Statistics';
import type { TeamMember } from '../models/TeamMember';
import type { UserItem } from '../models/UserItem';
import type { UserList } from '../models/UserList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthorizedService {

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
requestBody: {
/**
 * user name (is ignored for existing users)
 */
name?: string;
/**
 * user's email
 */
email: string;
/**
 * team member permissions
 */
permissions?: Array<string>;
/**
 * team member label
 */
label: string;
},
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
     * endpoint for getting companies list
     * companies list
     * @param page requested page number
     * @returns any request succeeded
     * @throws ApiError
     */
    public static companiesList(
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
list?: Array<CompanyList>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/company',
            query: {
                'page': page,
            },
            errors: {
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for creating company
     * creating company
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static companyCreate(
requestBody: CompanyItem,
): CancelablePromise<{
/**
 * request result
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/company',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * endpoint for getting company
     * getting company
     * @param id company id
     * @returns CompanyItem request succeeded
     * @throws ApiError
     */
    public static companyGet(
id: string,
): CancelablePromise<CompanyItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/company/{id}',
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
     * endpoint for updating company
     * updating company
     * @param id company id
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static companyUpdate(
id: string,
requestBody: CompanyItem,
): CancelablePromise<{
/**
 * request result
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/company/{id}',
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
     * endpoint for deleting company
     * deleting company
     * @param id company id
     * @returns any request succeeded
     * @throws ApiError
     */
    public static companyDelete(
id: string,
): CancelablePromise<{
/**
 * request result description
 */
message?: string;
}> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/company/{id}/delete',
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
list?: Array<ProjectList>;
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
requestBody: ProjectItem,
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
     * @returns ProjectItem request succeeded
     * @throws ApiError
     */
    public static projectGet(
id: string,
): CancelablePromise<ProjectItem> {
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
     * endpoint for getting currencies list
     * getting currencies list
     * @returns any request succeeded
     * @throws ApiError
     */
    public static currenciesList(): CancelablePromise<{
convertTo?: Array<{
/**
 * currency name
 */
name?: string;
/**
 * currency type
 */
type?: 'fiat' | 'crypto';
}>;
order?: Array<string>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/project/currencies',
            errors: {
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
     * endpoint for creating users by admin with granting admin roles
     * creating users by admin with granting admin roles
     * @param requestBody 
     * @returns any request succeeded
     * @throws ApiError
     */
    public static userCreate(
requestBody: {
/**
 * user email
 */
email?: string;
/**
 * user name
 */
name?: string;
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
            url: '/account/admin',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `request failed`,
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

    /**
     * administrator endpoint for common statistics
     * common statistics
     * @param startTime time filter
     * @param endTime time filter
     * @param search search string
     * @param currency filter by currency
     * @returns Statistics request succeeded
     * @throws ApiError
     */
    public static commonStatistics(
startTime?: string,
endTime?: string,
search?: string,
currency?: string,
): CancelablePromise<Statistics> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/statistics',
            query: {
                'startTime': startTime,
                'endTime': endTime,
                'search': search,
                'currency': currency,
            },
            errors: {
                400: `request failed`,
                403: `request failed`,
            },
        });
    }

    /**
     * administrator endpoint for personal statistics
     * personal statistics
     * @param id order id
     * @param startTime time filter
     * @param endTime time filter
     * @param search search string
     * @param currency filter by currency
     * @returns Statistics request succeeded
     * @throws ApiError
     */
    public static personalStatistics(
id: string,
startTime?: string,
endTime?: string,
search?: string,
currency?: string,
): CancelablePromise<Statistics> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/statistics/{id}',
            path: {
                'id': id,
            },
            query: {
                'startTime': startTime,
                'endTime': endTime,
                'search': search,
                'currency': currency,
            },
            errors: {
                403: `request failed`,
                404: `request failed`,
            },
        });
    }

}
