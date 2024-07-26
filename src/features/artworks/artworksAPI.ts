// LIST

type Pagination = {
  current_page: number;
  limit: number;
  next_url: string;
  offset: number;
  total: number;
  total_pages: number;
};

export type ArtworkResponse = {
  id: number;
  title: string;
  thumbnail: { alt_text: string } | null;
  image_id: string | null;
  description: string;
  credit_line: string;
  artist_title: string;
  provenance_text: string;
  /**
   * Ideally this would be an accurate representation of the data returned by the API
   * For the sake of brevity it only includes the fields needed for our UI representation
   */
};

export type FetchArtworksDataResponseBody = {
  pagination: Pagination;
  data: ArtworkResponse[];
};

export type ArtworksQueryConfig = {
  limit?: number;
  page?: number;
  fields: (keyof ArtworkResponse)[];
};

const defaultArtworksQueryConfig = {
  limit: 4,
  page: 1,
};

export const fetchArtworksData = async (config: ArtworksQueryConfig) => {
  const { limit, page } = { ...defaultArtworksQueryConfig, ...config };

  const searchParams = new URLSearchParams({
    limit: String(limit),
    page: String(page),
  });

  if (config.fields.length) {
    searchParams.append("fields", config.fields.join(","));
  }

  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks?${searchParams}`,
  );
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(response.statusText);
  }
};

// SINGLE

export type FetchArtworkDetailsDataResponseBody = {
  data: ArtworkResponse;
};

export type ArtworkDetailsQueryConfig = Pick<ArtworksQueryConfig, "fields">;

export const fetchArtworkDetailsData = async (
  id: string,
  config?: ArtworkDetailsQueryConfig,
) => {
  const searchParams = new URLSearchParams();
  if (config?.fields?.length) {
    searchParams.append("fields", config.fields.join(","));
  }

  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks/${id}?${searchParams}`,
  );
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(response.statusText);
  }
};

export const getImageSRC = (imageID: string) => {
  return `https://www.artic.edu/iiif/2/${imageID}/full/843,/0/default.jpg`;
};
