import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import error from "../../utils/error";
import { AuthenticatedService, ProfileData } from "@awex-api";

interface AccountConfigSettingsState {
  data?: ProfileData;
  loadingStatus: "idle" | "pending" | "succeed" | "failed";
  loadingError?: string;
}

const defaultProfileData: ProfileData = {
  name: "",
  email: "",
  companyName: "",
  phone: "",
  telegram: "",
  country: "",
  url: "",
  legalAddress: "",
};

const initialState: AccountConfigSettingsState = {
  data: undefined,
  loadingStatus: "idle",
  loadingError: undefined,
};

export const getAccountProfile = createAsyncThunk(
  "accountProfile/getAccountProfile",
  async () => {
    return await AuthenticatedService.profileGet();
  }
);

export const setAccountProfile = createAsyncThunk(
  "accountProfile/setAccountProfile",
  async (data: ProfileData) => {
    await AuthenticatedService.profileSet(data);
    return data;
  }
);

const slice = createSlice({
  name: "accountProfile",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getAccountProfile.fulfilled, (state, action) => {
      state.loadingStatus = "succeed";
      state.data = action.payload;
    });
    builder.addCase(getAccountProfile.pending, (state) => {
      state.loadingStatus = "pending";
    });
    builder.addCase(getAccountProfile.rejected, (state, action) => {
      state.loadingStatus = "failed";
      state.loadingError = error(action.error);
    });
    builder.addCase(setAccountProfile.fulfilled, (state, action) => {
      state.loadingStatus = "succeed";
      state.data = action.payload;
    });
    builder.addCase(setAccountProfile.pending, (state) => {
      state.loadingStatus = "pending";
    });
    builder.addCase(setAccountProfile.rejected, (state, action) => {
      state.loadingStatus = "failed";
      state.loadingError = error(action.error);
    });
  },
});

export default slice.reducer;
