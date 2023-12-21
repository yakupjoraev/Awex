import type { AdminItem } from "../models/AdminItem";
import type { AdminList } from "../models/AdminList";
import type { CompanyItem } from "../models/CompanyItem";
import type { CompanyList } from "../models/CompanyList";
import type { EarningsList } from "../models/EarningsList";
import type { MerchantItem } from "../models/MerchantItem";
import type { MerchantList } from "../models/MerchantList";
import type { Order } from "../models/Order";
import type { ProjectData } from "../models/ProjectData";
import type { ProjectItem } from "../models/ProjectItem";
import type { ProjectItemAdmin } from "../models/ProjectItemAdmin";
import type { ProjectList } from "../models/ProjectList";
import type { ProjectListAdmin } from "../models/ProjectListAdmin";
import type { ReferralList } from "../models/ReferralList";
import type { Statistics } from "../models/Statistics";
import type { TeamMember } from "../models/TeamMember";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { OfficeAddressListAdmin } from "../models/OfficeAddressAdminList";
import { OfficeAddressAdminItem } from "../models/OfficeAddressAdminItem";
import { TCardList } from "../models/CardList";
import { Card } from "../models/Card";

export class AuthorizedService {
  public static teamMembersList(page?: string): CancelablePromise<{
    page?: number;
    pages?: number;
    list?: Array<TeamMember>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/account/team",
      query: {
        page: page,
      },
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static teamMembersAdd(requestBody: {
    name?: string;
    email: string;
    permissions?: Array<string>;
    label: string;
  }): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/account/team",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }

  public static teamMemberGet(id: string): CancelablePromise<TeamMember> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/account/team/{id}",
      path: {
        id: id,
      },
      errors: {
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static teamMemberSet(
    id: string,
    requestBody: {
      permissions?: Array<string>;
      label?: string;
    }
  ): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/account/team/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static teamMemberEnable(id: string): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/account/team/{id}/enable",
      path: {
        id: id,
      },
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static teamMemberDisable(id: string): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/account/team/{id}/disable",
      path: {
        id: id,
      },
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static teamMemberDelete(id: string): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/account/team/{id}/delete",
      path: {
        id: id,
      },
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static adminList(
    page?: string,
    search?: string,
    role?: string
  ): CancelablePromise<{
    page?: number;
    pages?: number;
    list?: Array<AdminList>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/account/admin",
      query: {
        page: page,
        search: search,
        role: role,
      },
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static userCreate(requestBody: {
    email?: string;
    name?: string;
    roles?: Array<string>;
  }): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/account/admin",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }

  public static adminGet(id: string): CancelablePromise<AdminItem> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/account/{id}/admin",
      path: {
        id: id,
      },
      errors: {
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static adminUpdate(
    id: string,
    requestBody: {
      roles?: Array<string>;
    }
  ): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/account/{id}/admin",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static adminEnable(id: string): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/account/{id}/admin/enable",
      path: {
        id: id,
      },
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static adminDisable(id: string): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/account/{id}/admin/disable",
      path: {
        id: id,
      },
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static adminDelete(id: string): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/account/{id}/admin/delete",
      path: {
        id: id,
      },
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static merchantList(
    page?: string,
    search?: string
  ): CancelablePromise<{
    page?: number;
    pages?: number;
    list?: Array<MerchantList>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/account/merchant",
      query: {
        page: page,
        search: search,
      },
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static merchantGet(id: string): CancelablePromise<MerchantItem> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/account/{id}/merchant",
      path: {
        id: id,
      },
      errors: {
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static merchantEnable(id: string): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/account/{id}/merchant/enable",
      path: {
        id: id,
      },
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static merchantDisable(id: string): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/account/{id}/merchant/disable",
      path: {
        id: id,
      },
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static merchantDelete(id: string): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/account/{id}/merchant/delete",
      path: {
        id: id,
      },
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static referralsList(
    page?: string,
    status?: string,
    startTime?: number,
    endTime?: number
  ): CancelablePromise<{
    page?: number;
    pages?: number;
    list?: Array<ReferralList>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/account/referral",
      query: {
        page: page,
        status: status,
        startTime: startTime,
        endTime: endTime,
      },
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static earningsList(
    page?: string,
    type?: string,
    startTime?: number,
    endTime?: number
  ): CancelablePromise<{
    page?: number;
    pages?: number;
    list?: Array<EarningsList>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/account/referral/earnings",
      query: {
        page: page,
        type: type,
        startTime: startTime,
        endTime: endTime,
      },
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static adminSetReferralFees(requestBody: {
    fromFees: number;
    fromTurnover: number;
  }): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/account/referral/admin/fees",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }

  public static companiesList(page?: string): CancelablePromise<{
    page?: number;
    pages?: number;
    list?: Array<CompanyList>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/company",
      query: {
        page: page,
      },
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static companyCreate(requestBody: CompanyItem): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/company",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }

  public static companyGet(id: string): CancelablePromise<CompanyItem> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/company/{id}",
      path: {
        id: id,
      },
      errors: {
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static companyUpdate(
    id: string,
    requestBody: CompanyItem
  ): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/company/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static companyDelete(id: string): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/company/{id}/delete",
      path: {
        id: id,
      },
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static feeGet(): CancelablePromise<{
    current?: number;
    next?: number | null;
    nextTimestamp?: number | null;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/fee",
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static feeSet(requestBody: {
    fee: number;
    timestamp: number;
  }): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/fee",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }

  public static personalFeeGet(id: string): CancelablePromise<{
    current?: number;
    next?: number | null;
    nextTimestamp?: number | null;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/fee/{id}",
      path: {
        id: id,
      },
      errors: {
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static personalFeeSet(
    id: string,
    requestBody: {
      fee: number;
      timestamp: number;
    }
  ): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/fee/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static ordersList(
    page?: string,
    projectId?: number,
    status?: "wait" | "paid" | "expired",
    startTime?: number,
    endTime?: number
  ): CancelablePromise<{
    page?: number;
    pages?: number;
    list?: Array<Order>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/order",
      query: {
        page: page,
        projectId: projectId,
        status: status,
        startTime: startTime,
        endTime: endTime,
      },
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static orderCreate(requestBody: {
    name: string;
    price: number;
    currency: string;
    projectId?: number;
    buyerIdentifier?: string;
    depositAmount?: number;
    depositReturnTime?: number;
    convertTo?: "fiat" | "stablecoin";
    isTemplate?: boolean;
  }): CancelablePromise<{
    id?: number;
    uniqueId?: string;
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/order/invoice",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }

  public static orderGet(id: string): CancelablePromise<{
    name?: string;
    uniqueId?: string;
    amount?: number;
    buyerIdentifier?: string;
    data?: Record<string, any>;
    paymentData?: Record<string, any>;
    status?: "wait" | "paid" | "expired";
    createdAt?: number;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/order/{id}",
      path: {
        id: id,
      },
      errors: {
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static adminOrderGet(id: string): CancelablePromise<{
    name?: string;
    uniqueId?: string;
    amount?: number;
    buyerIdentifier?: string;
    data?: Record<string, any>;
    paymentData?: Record<string, any>;
    status?: "wait" | "paid" | "expired";
    createdAt?: number;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/order/{id}/admin",
      path: {
        id: id,
      },
      errors: {
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static depositsList(
    page?: string,
    projectId?: number,
    status?: "wait" | "paid" | "expired",
    startTime?: number,
    endTime?: number
  ): CancelablePromise<{
    page?: number;
    pages?: number;
    list?: Order[]; //Array<Order>
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/order/deposit",
      query: {
        page: page,
        projectId: projectId,
        status: status,
        startTime: startTime,
        endTime: endTime,
      },
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static depositRequestsList(
    page?: string,
    projectId?: number,
    startTime?: number,
    endTime?: number
  ): CancelablePromise<{
    page?: number;
    pages?: number;
    list?: Array<Order>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/order/deposit/request",
      query: {
        page: page,
        projectId: projectId,
        startTime: startTime,
        endTime: endTime,
      },
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static createDepositRequest(id: string): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/order/{id}/deposit/request",
      path: {
        id: id,
      },
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }

  public static returnDeposit(id: string): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/order/{id}/deposit/return",
      path: {
        id: id,
      },
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }

  public static createWithholdRequest(
    id: string,
    requestBody: {
      withholdAmount: number;
    }
  ): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/order/{id}/deposit/withhold",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }

  public static withholdRequestUpload(
    id: string,
    formData: {
      upload: Blob;
    }
  ): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/order/{id}/deposit/document",
      path: {
        id: id,
      },
      formData: formData,
      mediaType: "multipart/form-data",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }

  public static depositWitholdFileDelete(
    id: string,
    documentId: string
  ): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/order/{id}/deposit/document/{documentId}/delete",
      path: {
        id: id,
        documentId: documentId,
      },
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }

  public static withholdRequestsList(
    page?: string,
    projectId?: number,
    startTime?: number,
    endTime?: number
  ): CancelablePromise<{
    page?: number;
    pages?: number;
    list?: Array<Order>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/order/deposit/withhold",
      query: {
        page: page,
        projectId: projectId,
        startTime: startTime,
        endTime: endTime,
      },
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static adminWithholdRequestsList(
    page?: string,
    projectId?: number,
    startTime?: number,
    endTime?: number
  ): CancelablePromise<{
    page?: number;
    pages?: number;
    list?: Array<Order>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/order/deposit/withhold/admin",
      query: {
        page: page,
        projectId: projectId,
        startTime: startTime,
        endTime: endTime,
      },
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static withholdRequestInfo(
    id: string,
    requestBody: {
      info: string;
    }
  ): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/order/{id}/deposit/withhold/info/admin",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }

  public static approveWithholdRequest(id: string): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/order/{id}/deposit/withhold/approve/admin",
      path: {
        id: id,
      },
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }

  public static rejectWithholdRequest(
    id: string,
    requestBody: {
      withholdRejectReason: string;
    }
  ): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/order/{id}/deposit/withhold/reject/admin",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }

  public static merchantCurrencies(amount?: string): CancelablePromise<{
    currencies?: Array<{
      currency?: string;
      name?: string;
      rate?: string;
      chain?: string;
    }>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/order/merchant/currencies",
      query: {
        amount: amount,
      },
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static merchantUsdtRate(
    amount: string,
    currency: string
  ): CancelablePromise<{
    currencies?: Array<{
      rate?: string;
    }>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/order/merchant/usdt-rate",
      query: {
        amount: amount,
        currency: currency,
      },
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static projectsList(page?: string): CancelablePromise<{
    page?: number;
    pages?: number;
    list?: Array<ProjectList>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/project",
      query: {
        page: page,
      },
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static projectCreate(requestBody: ProjectData): CancelablePromise<{
    id?: number;
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/project",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }

  public static projectGet(id: string): CancelablePromise<ProjectItem> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/project/{id}",
      path: {
        id: id,
      },
      errors: {
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static projectUpdate(
    id: string,
    requestBody: ProjectData
  ): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/project/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static projectValidate(id: string): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/project/{id}/request-validation",
      path: {
        id: id,
      },
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
        409: `request failed`,
      },
    });
  }

  public static projectDelete(id: string): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/project/{id}/delete",
      path: {
        id: id,
      },
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static adminProjectsList(
    page?: string,
    status?: string,
    search?: string
  ): CancelablePromise<{
    page?: number;
    pages?: number;
    list?: Array<ProjectListAdmin>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/project/admin",
      query: {
        page: page,
        status: status,
        search: search,
      },
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static administratorProjectGet(
    id: string
  ): CancelablePromise<ProjectItemAdmin> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/project/{id}/admin",
      path: {
        id: id,
      },
      errors: {
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static administratorProjectRequest(
    id: string,
    requestBody: {
      request: string;
    }
  ): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/project/{id}/admin/request",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static administratorProjectApprove(id: string): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/project/{id}/admin/approve",
      path: {
        id: id,
      },
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static administratorProjectReject(
    id: string,
    requestBody: {
      reason: string;
    }
  ): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/project/{id}/admin/reject",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static adminProjectsStatusesList(): CancelablePromise<Array<string>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/project/admin/statuses",
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static currenciesList(): CancelablePromise<{
    convertTo?: Array<{
      name?: string;
      type?: "fiat" | "crypto";
    }>;
    order?: Array<string>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/project/currencies",
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static commonStatistics(
    startTime?: string,
    endTime?: string,
    search?: string,
    currency?: string
  ): CancelablePromise<Statistics> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/statistics",
      query: {
        startTime: startTime,
        endTime: endTime,
        search: search,
        currency: currency,
      },
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }

  public static personalStatistics(
    id: string,
    startTime?: string,
    endTime?: string,
    search?: string,
    currency?: string
  ): CancelablePromise<Statistics> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/statistics/{id}",
      path: {
        id: id,
      },
      query: {
        startTime: startTime,
        endTime: endTime,
        search: search,
        currency: currency,
      },
      errors: {
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static projectNames(): CancelablePromise<{
    list: Array<{
      id: 0;
      name: string;
    }>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/project/names",
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static getTransactions(
    query: {
      startTime?: string;
      endTime?: string;
      projectId?: string;
      currency?: string;
      type?: string;
      classType?: string;
    },
    page?: string
  ): CancelablePromise<{
    page: number;
    pages: number;
    list: Array<{
      id: number;
      orderId: number;
      date: number;
      userId: number;
      type: string; // 'debit' | ''
      class: string;
      paymentOrderAmount: number;
      paymentDepositAmount: number;
      paymentTotalAmount: number;
      paymentFeeAmount: number;
      currency: string;
      invoice: string;
      details: string;
      projectId: number;
    }>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/transaction",
      query: {
        page: page,
        startTime: query.startTime,
        endTime: query.endTime,
        projectId: query.projectId,
        currency: query.currency,
        type: query.type,
        classType: query.classType,
      },
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static getTransactionParameters(): CancelablePromise<{
    parameters: {
      classes: string[];
      types: string[];
      currencies: string[];
    };
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/transaction/parameters",
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static getOrderTemplates(): CancelablePromise<{
    list: Array<{
      id: number;
      data: {
        userId: number;
        name: string;
        price: number;
        currency: string;
        projectId: number;
        depositAmount: number;
        depositReturnTime: number;
      };
      created_at: number;
    }>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/order-template",
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static setOrderTemplate(
    id: string,
    requestBody: {
      name: string;
      price: number;
      currency: string;
      projectId: number;
      buyerIdentifier?: string;
      comment?: string;
      depositAmount: number;
      depositReturnTime: number;
      convertTo: "stablecoin";
    }
  ): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/order-template/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }

  public static deleteOrderTemplate(id: string): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/order-template/{id}/delete",
      path: {
        id: id,
      },
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }

  public static getOrderDepositData(): CancelablePromise<{
    withdrawRequestsNumber: number;
    withdrawRequestsAmount: string;
    activeDepositsNumber: number;
    activeDepositsAmount: string;
    onReviewWithdrawRequestsNumber: number;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/order/deposit/data",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }

  public static getOfficeAddresses(): CancelablePromise<{
    list: Array<{
      id: number;
      data: {};
      address: string;
      created_at: number;
    }>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/office",
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static createOfficeAddress(requestBody: {
    companyName: string;
    address: string;
  }): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/office",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static uploadOfficeAddressDocument(
    id: string,
    formData: {
      upload: Blob[];
    }
  ): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: `/office/${id}/upload`,
      formData: formData,
      mediaType: "multipart/form-data",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static requestOfficeAddressValidation(id: string): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: `/office/${id}/request-validation`,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static getAdminOfficeAddresses(
    page?: number,
    status?: string,
    search?: string
  ): CancelablePromise<OfficeAddressListAdmin> {
    return __request(OpenAPI, {
      method: "GET",
      url: `/office/admin`,
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
      query: {
        page,
        status,
        search,
      },
    });
  }

  public static getAdminOfficeAddress(
    id: string
  ): CancelablePromise<OfficeAddressAdminItem> {
    return __request(OpenAPI, {
      method: "POST",
      url: `/office/${id}/admin`,
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static administratorOfficeApprove(id: string): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/office/{id}/admin/approve",
      path: {
        id: id,
      },
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  public static administratorOfficeAddressReject(
    id: string,
    requestBody: {
      reason: string;
    }
  ): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/office/{id}/admin/reject",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
    });
  }

  // public static administratorGetOfficeAddressDocument(
  //   filename: string
  // ): CancelablePromise<any> {
  //   return __request(OpenAPI, {
  //     method: "GET",
  //     url: "/api/uploaded-files/{fileName}",
  //     errors: {
  //       400: `request failed`,
  //       403: `Forbidden`,
  //       404: `request failed`,
  //     },
  //     path: {
  //       fileName: filename,
  //     },
  //   });
  // }

  public static administratorGetOfficeAddressDocument(
    fileName: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/uploaded-files/{fileName}",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
        404: `request failed`,
      },
      path: {
        fileName: fileName,
      },
    });
  }

  public static getCardsList(): CancelablePromise<TCardList> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/account/card",
      errors: {
        403: `Forbidden`,
      },
    });
  }

  public static addNewCard(requestBody: Card): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/account/card",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `request failed`,
        403: `Forbidden`,
      },
    });
  }
      
  public static getLog(
    page?: string,
    event?: string,
    startTime?: number,
    endTime?: number
    ): CancelablePromise<{
        page: number,
        pages: number,
        list: Array<{
            id: number,
            event: string,
            data: {
                user_id: number,
            },
            createdAt: number
        }>
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/log',
            query: {
                'page': page,
                'event': event,
                'startTime': startTime,
                'endTime': endTime,
            },
            errors: {
                400: `request failed`,
                403: `Forbidden`,
            },
        })
    }
}
