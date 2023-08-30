import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import error from "../../utils/error";
import { ApiError, CommonService, OpenAPI } from "@awex-api";
import { getUser, removeUser, setUser } from "../../services/user.service";
import {
  AUTH_SIGN_IN_ERROR,
  GENERAL_REGISTER_ERROR,
  GENERAL_SIGN_IN_ERROR,
  REGISTER_ERROR_CODE,
  SIGN_IN_ERROR_CODE,
} from "./errors";
import { makeSerializedError } from "./utils/makeSerializableError";

export interface AuthState {
  user?: {
    email: string;
    token: string;
    verified: boolean;
    expiration: number;
  };
  signInStatus: "idle" | "pending" | "succeed" | "failed";
  signInError?: { code: SIGN_IN_ERROR_CODE; message: string };
  registerStatus: "idle" | "pending" | "succeed" | "failed";
  registerError?: { code: REGISTER_ERROR_CODE; message: string };
}

const user = getUser();

const initialState: AuthState = {
  user: user || undefined,
  signInStatus: "idle",
  signInError: undefined,
  registerStatus: "idle",
  registerError: undefined,
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (opts: { login: string; password: string }) => {
    let authDetails;
    try {
      authDetails = await CommonService.login({
        email: opts.login,
        password: opts.password,
      });
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        throw makeSerializedError(error, { code: AUTH_SIGN_IN_ERROR });
      }
      if (error instanceof Error) {
        throw makeSerializedError(error, { code: GENERAL_SIGN_IN_ERROR });
      }
      throw error;
    }
    const user = {
      email: opts.login,
      verified: authDetails.verified || false,
      token: authDetails.token || "",
      expiration: authDetails.expiration || 0,
    };
    setUser(user);
    OpenAPI.TOKEN = user.token;
    return user;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (opts: { email: string; password: string }) => {
    try {
      await CommonService.registration({
        email: opts.email,
        password: opts.password,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        throw makeSerializedError(error, { code: GENERAL_REGISTER_ERROR });
      }
      throw error;
    }
    let authDetails;
    try {
      authDetails = await CommonService.login({
        email: opts.email,
        password: opts.password,
      });
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        throw makeSerializedError(error, { code: AUTH_SIGN_IN_ERROR });
      }
      if (error instanceof Error) {
        throw makeSerializedError(error, { code: GENERAL_SIGN_IN_ERROR });
      }
      throw error;
    }
    const user = {
      email: opts.email,
      verified: authDetails.verified || false,
      token: authDetails.token || "",
      expiration: authDetails.expiration || 0,
    };
    setUser(user);
    OpenAPI.TOKEN = user.token;
    return user;
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  removeUser();
});

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.signInStatus = "succeed";
      state.user = action.payload;
      state.signInError = undefined;
    });
    builder.addCase(signIn.pending, (state) => {
      state.signInStatus = "pending";
      state.signInError = undefined;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.signInStatus = "failed";
      if (action.error.code === AUTH_SIGN_IN_ERROR) {
        state.signInError = {
          code: AUTH_SIGN_IN_ERROR,
          message: action.error.message || "unknown",
        };
      } else {
        state.signInError = {
          code: GENERAL_SIGN_IN_ERROR,
          message: error(action.error),
        };
      }
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.signInStatus = "idle";
      state.user = undefined;
      state.signInError = undefined;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.signInStatus = "succeed";
      state.user = action.payload;
      state.registerError = undefined;
    });
    builder.addCase(register.pending, (state) => {
      state.registerStatus = "pending";
      state.registerError = undefined;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.registerStatus = "failed";
      if (action.error.code === AUTH_SIGN_IN_ERROR) {
        state.registerError = {
          code: AUTH_SIGN_IN_ERROR,
          message: action.error.message || "unknown",
        };
      } else if (action.error.code === GENERAL_SIGN_IN_ERROR) {
        state.registerError = {
          code: GENERAL_SIGN_IN_ERROR,
          message: action.error.message || "unknown",
        };
      } else {
        state.registerError = {
          code: GENERAL_REGISTER_ERROR,
          message: error(action.error),
        };
      }
    });
  },
});

export default slice.reducer;
