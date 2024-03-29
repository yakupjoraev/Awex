import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import error from "../../utils/error"
import { AuthorizedService } from "@awex-api"
import { listAllProjects } from "./utils/listAllProjects"
import { AppProject } from "src/types"

interface ProjectsState {
  data?: { id: string; project: AppProject }[]
  loading: boolean
  error?: string
}

const initialState: ProjectsState = {
  data: undefined,
  loading: false,
  error: undefined,
}

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (opts: { project: AppProject }) => {
    await AuthorizedService.projectCreate({ ...opts.project, cmd: "" } as any)
    return await listAllProjects()
  }
)

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (opts: { id: string }) => {
    await AuthorizedService.projectDelete(opts.id)
    return opts.id
  }
)

export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async () => {
    return await listAllProjects()
  }
)

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (opts: { id: string; project: AppProject }) => {
    await AuthorizedService.projectUpdate(opts.id, {
      ...opts.project,
      cms: "",
    } as any);
    return { id: opts.id, project: opts.project }
  }
)

const slice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers(builder): void {
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.data = action.payload
    })

    builder.addCase(deleteProject.fulfilled, (state, action) => {
      if (state.data) {
        const index = state.data.findIndex(
          (listItem) => listItem.id === action.payload
        )

        if (index !== -1) {
          state.data = [
            ...state.data.slice(0, index),
            ...state.data.slice(index + 1),
          ]
        }
      }
    })

    builder.addCase(getProjects.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })

    builder.addCase(getProjects.rejected, (state, action) => {
      state.loading = false
      // action.payload contains error information
      state.error = error(action.payload)
    })

    builder.addCase(updateProject.fulfilled, (state, action) => {
      if (!state.data) return
      const index = state.data.findIndex(
        (listItem) => listItem.id === action.payload.id
      )

      if (index === -1) return
      const project = state.data[index]
      Object.assign(project, action.payload.project)
    })
  },
})

export default slice.reducer