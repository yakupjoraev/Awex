import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit"
import error from "../../utils/error"
import { ApiError, CommonService, OpenAPI } from "@awex-api"
import { getUser, removeUser, setUser } from "../../services/user.service"
import {
  AUTH_SIGN_IN_ERROR,
  SignInError,
  UNKNOWN_SIGN_IN_ERROR,
  VER_REQ_SIGN_IN_ERROR,
} from "./errors"

interface LoginPayload {
  login: string
  password: string
}

interface User {
  sessionId: number
  email: string
  token: string
  expiration: number
}

export interface AuthState {
  user?: User
  signInStatus: "idle" | "pending" | "succeed" | "failed"
  signInError?: SignInError
}

const user = getUser()

const initialState: AuthState = {
  user: user || undefined,
  signInStatus: "idle",
  signInError: undefined,
}

export const signIn = createAsyncThunk<User, LoginPayload, { rejectValue: SignInError }>(
  "auth/signIn",
  async (opts: LoginPayload, thunkApi) => {
    let authDetails
    try {
      authDetails = await CommonService.login({
        email: opts.login,
        password: opts.password,
      })
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        return thunkApi.rejectWithValue({
          code: AUTH_SIGN_IN_ERROR,
          message: "wrong login or password",
        })
      }

      if (error instanceof Error) {
        return thunkApi.rejectWithValue({
          code: UNKNOWN_SIGN_IN_ERROR,
          message: error.message,
        })
      }
      throw error
    }
    
    if (authDetails.verified === false) {
      return thunkApi.rejectWithValue({
        code: VER_REQ_SIGN_IN_ERROR,
        message: "verification required",
      })
    }

    const user: User = {
      email: opts.login,
      sessionId: authDetails.sessionId || 0,
      token: authDetails.token || "",
      expiration: authDetails.expiration || 0,
    }
    setUser(user)
    OpenAPI.TOKEN = user.token
    return user
  }
)

export const signOut = createAsyncThunk("auth/signOut", async () => {
  removeUser()
})

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.signInStatus = "succeed"
      state.user = action.payload
      state.signInError = undefined
    })
    builder.addCase(signIn.pending, (state) => {
      state.signInStatus = "pending"
      state.signInError = undefined
    })
    builder.addCase(signIn.rejected, (state, action) => {
      state.signInStatus = "failed"
      if (action.payload) {
        state.signInError = action.payload
      } else {
        state.signInError = {
          code: UNKNOWN_SIGN_IN_ERROR,
          message: error(action.error),
        }
      }
    })
    builder.addCase(signOut.fulfilled, (state) => {
      state.signInStatus = "idle"
      state.user = undefined
      state.signInError = undefined
    })
  },
})

export default slice.reducer
