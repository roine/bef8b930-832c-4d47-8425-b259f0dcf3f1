import { useEffect } from "react";
import { fetchArtworks, selectArtworks } from "./artworksSlice.ts";
import { AppDispatch } from "../../store.ts";
import { useDispatch, useSelector } from "react-redux";
import { Config } from "./artworksAPI.ts";

export const useArtworks = (config: undefined | Config) => {
  const dispatch: AppDispatch = useDispatch();

  const artworks = useSelector(selectArtworks);

  useEffect(() => {
    fetch(config);
  }, []);

  const fetch = (newConfig: Config | undefined = {}) => {
    dispatch(fetchArtworks({ ...config, ...newConfig }));
  };

  return { artworks, refetch: fetch };
};
