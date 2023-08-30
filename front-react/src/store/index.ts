import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import landingReducer from "./projects/slice";
import authReducer from "./auth/slice";

const store = configureStore({
  reducer: {
    projects: landingReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
