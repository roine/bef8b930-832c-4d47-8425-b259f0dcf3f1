import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as RemoteData from "../../utils/remoteData";
import { Config, fetchArtworksData, Pagination } from "./artworksAPI";
import { RootState } from "../../store.ts";

type Artwork = {
  id: number;
  api_link: string;
  title: string;
  thumbnail: { alt_text: string } | null;
  image_id: string | null;
  description: string;
  credit_line: string;
  artist_title: string;
};

type State = {
  list: RemoteData.Model<string, { pagination: Pagination; data: Artwork[] }>;
  single: RemoteData.Model<string, Artwork>;
};

const initialState: State = {
  list: RemoteData.initial,
  single: RemoteData.initial,
};

export const fetchArtworks = createAsyncThunk(
  "artworks/fetchArtworks",
  async (arg?: Config) => {
    return await fetchArtworksData(arg);
  },
);

const artworksSlice = createSlice({
  name: "artworks",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtworks.pending, (state) => {
        state.list = RemoteData.pending;
      })
      .addCase(fetchArtworks.fulfilled, (state, action) => {
        state.list = RemoteData.success(action.payload);
      })
      .addCase(fetchArtworks.rejected, (state, action) => {
        state.list = RemoteData.failure(
          action.error.message ?? "Unknown error",
        );
      });
  },
});

export const selectArtworks = (state: RootState) => state.artworks.list;

export default artworksSlice.reducer;
