export const UNKNOWN_SIGN_IN_ERROR = "UNKNOWN_SIGN_IN_ERROR";
export const AUTH_SIGN_IN_ERROR = "AUTH_SIGN_IN_ERROR";
export const VER_REQ_SIGN_IN_ERROR = "VER_REQ_SIGN_IN_ERROR";

export type SignInError =
  | {
      code: typeof UNKNOWN_SIGN_IN_ERROR;
      message: string;
    }
  | {
      code: typeof AUTH_SIGN_IN_ERROR;
      message: string;
    }
  | {
      code: typeof VER_REQ_SIGN_IN_ERROR;
      message: string;
    };
