import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import error from "../../utils/error";
import { AuthorizedService, Project } from "@awex-api";
import { listAllProjects } from "./utils/listAllProjects";

interface ProjectsState {
  data?: Record<string, Project>;
  loading: boolean;
  error?: string;
}

const initialState: ProjectsState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (opts: { project: Project }) => {
    await AuthorizedService.projectCreate({ data: opts.project });
    return await listAllProjects();
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (opts: { id: string }) => {
    await AuthorizedService.projectDelete(opts.id);
    return opts.id;
  }
);

export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async () => {
    return await listAllProjects();
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (opts: { id: string; project: Project }) => {
    await AuthorizedService.projectUpdate(opts.id, opts.project);
    return { id: opts.id, project: opts.project };
  }
);

const slice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      if (state.data) {
        delete state.data[action.payload];
      }
    });
    builder.addCase(getProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getProjects.rejected, (state, action) => {
      state.loading = false;
      // action.payload contains error information
      state.error = error(action.payload);
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      if (state.data) {
        const project = state.data[action.payload.id];
        if (project) {
          Object.assign(project, action.payload.project);
        }
      }
    });
  },
});

export default slice.reducer;
