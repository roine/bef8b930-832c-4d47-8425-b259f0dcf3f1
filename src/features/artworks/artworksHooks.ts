import { useEffect } from "react";
import {
  fetchArtworkDetails,
  fetchArtworks,
  selectArtworkDetails,
  selectArtworks,
} from "./artworksSlice.ts";
import { AppDispatch } from "../../store.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  ArtworkDetailsQueryConfig,
  ArtworksQueryConfig,
} from "./artworksAPI.ts";

export const useArtworks = (config: ArtworksQueryConfig) => {
  const dispatch: AppDispatch = useDispatch();

  const artworks = useSelector(selectArtworks);

  useEffect(() => {
    fetch(config);
  }, []);

  const fetch = (newConfig: Partial<ArtworksQueryConfig> | undefined = {}) => {
    dispatch(fetchArtworks({ ...config, ...newConfig }));
  };

  return { artworks, refetch: fetch };
};

export const useArtworkDetails = (
  artworkID: string,
  config: ArtworkDetailsQueryConfig,
) => {
  const dispatch: AppDispatch = useDispatch();

  const artwork = useSelector(selectArtworkDetails);

  useEffect(() => {
    fetch(config);
  }, []);

  const fetch = (
    newConfig: Partial<ArtworkDetailsQueryConfig> | undefined = {},
  ) => {
    dispatch(
      fetchArtworkDetails({
        id: artworkID,
        ...config,
        ...newConfig,
      }),
    );
  };

  return { artwork, refetch: fetch };
};
