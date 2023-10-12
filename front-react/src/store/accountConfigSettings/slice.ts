import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import error from "../../utils/error";
import { AuthenticatedService, Project } from "@awex-api";

interface AccountConfigSettingsState {
  data?: {
    currencies?: string[] | undefined;
    countries?: string[] | undefined;
    permissions?: string[] | undefined;
    labels?: string[] | undefined;
    roles?: string[] | undefined;
  };
  loading: boolean;
  error?: string;
}

const initialState: AccountConfigSettingsState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const getConfigSettings = createAsyncThunk(
  "accountConfigSettings/getConfigSettings",
  async () => {
    return await AuthenticatedService.settingsList();
  }
);

const slice = createSlice({
  name: "accountConfigSettings",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(getConfigSettings.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getConfigSettings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getConfigSettings.rejected, (state, action) => {
      state.loading = false;
      state.error = error(action.error);
    });
  },
});

export default slice.reducer;
