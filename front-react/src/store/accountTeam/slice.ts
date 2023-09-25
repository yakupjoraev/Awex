import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import error from "../../utils/error";
import { AuthenticatedService, TeamMember } from "@awex-api";
import { listAllTeamMembers } from "./utils/listAllTeamMembers";
import { createAppTeamMember } from "./utils/createAppTeamMember";

export interface AppTeamMember {
  id: string;
  name: string;
  email: string;
  permissions: string[];
  label: string;
  enabled: boolean;
  confirmed_at: number | null;
}

export interface CreateTeamMemberRequest {
  name?: string | undefined;
  email: string;
  permissions?: string[] | undefined;
  label: string;
}

interface AccountTeamState {
  data: EntityState<AppTeamMember>;
  loading: boolean;
  error?: string;
}

const teamMembersAdapter = createEntityAdapter<AppTeamMember>({
  selectId: (teamMember) => teamMember.id,
});

const initialState: AccountTeamState = {
  data: teamMembersAdapter.getInitialState(),
  loading: false,
  error: undefined,
};

export const addTeamMember = createAsyncThunk(
  "accountTeam/addTeamMember",
  async (teamMember: CreateTeamMemberRequest) => {
    await AuthenticatedService.teamMembersAdd({
      name: teamMember.name || undefined,
      email: teamMember.email,
      permissions: teamMember.permissions,
      label: teamMember.label,
    });
    const teamMembers = await listAllTeamMembers();
    const appTeamMembers: AppTeamMember[] =
      teamMembers.map(createAppTeamMember);
    return appTeamMembers;
  }
);

export const getTeamMembers = createAsyncThunk(
  "accountTeam/getTeamMembers",
  async () => {
    const teamMembers = await listAllTeamMembers();
    const appTeamMembers: AppTeamMember[] =
      teamMembers.map(createAppTeamMember);
    return appTeamMembers;
  }
);

export const enableTeamMember = createAsyncThunk(
  "accountTeam/enableTeamMember",
  async (opts: { id: string }) => {
    await AuthenticatedService.teamMemberEnable(opts.id);
    return { id: opts.id };
  }
);

export const disableTeamMember = createAsyncThunk(
  "accountTeam/disableTeamMember",
  async (opts: { id: string }) => {
    await AuthenticatedService.teamMemberDisable(opts.id);
    return { id: opts.id };
  }
);

export const deleteTeamMember = createAsyncThunk(
  "accountTeam/deleteTeamMember",
  async (opts: { id: string }) => {
    await AuthenticatedService.teamMemberDelete(opts.id);
    return { id: opts.id };
  }
);

const slice = createSlice({
  name: "accountTeam",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(addTeamMember.fulfilled, (state, action) => {
      state.loading = false;
      teamMembersAdapter.setAll(state.data, action.payload);
    });
    builder.addCase(addTeamMember.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTeamMember.rejected, (state, action) => {
      state.loading = false;
      state.error = error(action.error);
    });
    builder.addCase(getTeamMembers.fulfilled, (state, action) => {
      state.loading = false;
      teamMembersAdapter.setAll(state.data, action.payload);
    });
    builder.addCase(getTeamMembers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTeamMembers.rejected, (state, action) => {
      state.loading = false;
      state.error = error(action.error);
    });
    builder.addCase(enableTeamMember.fulfilled, (state, action) => {
      teamMembersAdapter.updateOne(state.data, {
        id: action.payload.id,
        changes: { enabled: true },
      });
    });
    builder.addCase(disableTeamMember.fulfilled, (state, action) => {
      teamMembersAdapter.updateOne(state.data, {
        id: action.payload.id,
        changes: { enabled: false },
      });
    });
    builder.addCase(deleteTeamMember.fulfilled, (state, action) => {
      teamMembersAdapter.removeOne(state.data, action.payload.id);
    });
  },
});

export const teamMemberSelectors = teamMembersAdapter.getSelectors();

export default slice.reducer;
