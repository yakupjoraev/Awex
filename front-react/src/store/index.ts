import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import authReducer from "./auth/slice"
import accountConfigSettingsReducer from "./accountConfigSettings/slice"
import accountTeamReducer from "./accountTeam/slice"
import accountProfileReducer from "./accountProfile/slice"
import projectsReducer from "./projects/slice"
import companiesReducer from "./companies/slice"
import accountBalanceReducer from "./accountBalance/slice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    accountConfigSettings: accountConfigSettingsReducer,
    accountProfile: accountProfileReducer,
    accountTeam: accountTeamReducer,
    projects: projectsReducer,
    companies: companiesReducer,
    accountBalance: accountBalanceReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export default store