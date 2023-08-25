import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import landingReducer from "./projects/slice";

const store = configureStore({
  reducer: {
    projects: landingReducer,
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