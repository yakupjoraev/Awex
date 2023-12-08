import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import error from "../../utils/error"
import { AuthenticatedService } from "@awex-api"

interface AccountBalance {
    data: {
        balance: string
        currency: string
    }
    loadingStatus: "idle" | "pending" | "succeed" | "failed"
    loadingError?: string
}


const initialState: AccountBalance = {
    data: {
        balance: '',
        currency: '',
    },
    loadingStatus: "idle",
    loadingError: undefined,
  }

export const getAccountBalance = createAsyncThunk(
    "accountBalance/getAccountBalance",
        async () => {
            return await AuthenticatedService.accountBalance()
    }
)

const slice = createSlice({
    name: "AccountBalance",
    initialState,
    reducers: {},
    extraReducers(builder): void {
      builder.addCase(getAccountBalance.fulfilled, (state, action) => {
        state.loadingStatus = "succeed"
        state.data = action.payload
      })
      builder.addCase(getAccountBalance.pending, (state) => {
        state.loadingStatus = "pending"
      })
      builder.addCase(getAccountBalance.rejected, (state, action) => {
        state.loadingStatus = "failed"
        state.loadingError = error(action.error)
      })
    },
  })
  
  export default slice.reducer