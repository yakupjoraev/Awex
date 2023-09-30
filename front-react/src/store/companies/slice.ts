import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import error from "../../utils/error";
import { AuthorizedService, CompanyItem } from "@awex-api";
import { listAllCompanies } from "./utils/listAllCompanies";

interface CompaniesState {
  data?: Record<string, string>;
  loading: boolean;
  error?: string;
}

const initialState: CompaniesState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const createCompany = createAsyncThunk(
  "companies/createCompany",
  async (opts: { companyItem: CompanyItem }) => {
    await AuthorizedService.companyCreate(opts.companyItem);
    return await listAllCompanies();
  }
);

export const deleteCompany = createAsyncThunk(
  "companies/deleteCompany",
  async (opts: { id: string }) => {
    await AuthorizedService.companyDelete(opts.id);
    return opts.id;
  }
);

export const getCompanies = createAsyncThunk(
  "companies/getCompanies",
  async () => {
    return await listAllCompanies();
  }
);

export const updateCompany = createAsyncThunk(
  "companies/updateCompany",
  async (opts: { id: string; companyItem: CompanyItem }) => {
    await AuthorizedService.companyUpdate(opts.id, opts.companyItem);
    return { id: opts.id, companyItem: opts.companyItem };
  }
);

const slice = createSlice({
  name: "companies",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(createCompany.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(deleteCompany.fulfilled, (state, action) => {
      if (state.data) {
        delete state.data[action.payload];
      }
    });
    builder.addCase(getCompanies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCompanies.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getCompanies.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
    builder.addCase(updateCompany.fulfilled, (state, action) => {
      if (state.data) {
        state.data[action.payload.id] = action.payload.companyItem.companyName;
      }
    });
  },
});

export default slice.reducer;
