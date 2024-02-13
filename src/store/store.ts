import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import magazineSlice from "./magazine/magazineSlice";
export const store = configureStore({
  reducer: {
    magazines: magazineSlice,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

const rootReducer = combineReducers({
  magazines: magazineSlice,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
