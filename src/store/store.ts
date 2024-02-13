import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import MagazinesReducer from "./magazine/magazineSlice";

export const store = configureStore({
  reducer: {
    magazines: MagazinesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

const rootReducer = combineReducers({
  magazines: MagazinesReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
