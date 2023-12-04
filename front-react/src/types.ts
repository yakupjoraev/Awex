export type ProjectValidation = {
  status?: ProjectValidation.status | null
  request?: string | null
  rejectReason?: string | null
}

export namespace ProjectValidation {

  export enum status {
      ON_REVIEW = 'onReview',
      WAITING = 'waiting',
      APPROVED = 'approved',
      REJECTED = 'rejected',
  }
}

export interface AppProject {
  companyId?: number
  name: string
  description?: string
  feePayee?: boolean
  paymentBills?: boolean
  paymentWeb?: boolean
  paymentTelegram?: boolean
  activity?: string
  convertTo?: string
  currency?: string
  urlWeb?: string
  urlNotification?: string
  urlPaymentSuccess?: string
  urlPaymentFailure?: string
  validationRequestedAt?: number | null
  validation?: ProjectValidation | null
}