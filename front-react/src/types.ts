export interface AppProject {
  companyId?: number;
  /**
   * name
   */
  name: string;
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
  convertTo?: string;
  /**
   * currency
   */
  currency?: string;

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
}
