import { configureStore } from "@reduxjs/toolkit";
import artworksSlice from "./features/artworks/artworksSlice";

export const store = configureStore({
  reducer: {
    artworks: artworksSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
