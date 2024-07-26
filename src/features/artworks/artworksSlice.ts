import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as RemoteData from "../../utils/remoteData";
import {
  ArtworkDetailsQueryConfig,
  ArtworksQueryConfig,
  fetchArtworkDetailsData,
  FetchArtworkDetailsDataResponseBody,
  fetchArtworksData,
  FetchArtworksDataResponseBody,
} from "./artworksAPI";
import { RootState } from "../../store.ts";

type State = {
  list: RemoteData.Model<string, FetchArtworksDataResponseBody>;
  single: RemoteData.Model<string, FetchArtworkDetailsDataResponseBody>;
};

const initialState: State = {
  list: RemoteData.initial,
  single: RemoteData.initial,
};

export const fetchArtworks = createAsyncThunk(
  "artworks/fetchArtworks",
  async (arg: ArtworksQueryConfig) => {
    return fetchArtworksData(arg);
  },
);

export const fetchArtworkDetails = createAsyncThunk(
  "artworks/fetchArtworkDetails",
  async (arg: { id: string } & ArtworkDetailsQueryConfig) => {
    const { id, ...rest } = arg;

    return fetchArtworkDetailsData(id, rest);
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

    builder
      .addCase(fetchArtworkDetails.pending, (state) => {
        state.single = RemoteData.pending;
      })
      .addCase(fetchArtworkDetails.fulfilled, (state, action) => {
        state.single = RemoteData.success(action.payload);
      })
      .addCase(fetchArtworkDetails.rejected, (state, action) => {
        state.single = RemoteData.failure(
          action.error.message ?? "Unknown error",
        );
      });
  },
});

export const selectArtworks = (state: RootState) => state.artworks.list;
export const selectArtworkDetails = (state: RootState) => state.artworks.single;

export default artworksSlice.reducer;
