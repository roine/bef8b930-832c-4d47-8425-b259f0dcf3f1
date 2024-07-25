export type Config = {
  limit?: number;
  page?: number;
  fields?: string[];
};

const defaultConfig = {
  limit: 4,
  page: 1,
};

export type Pagination = {
  current_page: number;
  limit: number;
  next_url: string;
  offset: number;
  total: number;
  total_pages: number;
};

export const fetchArtworksData = async (config?: Config) => {
  const { limit, page } = { ...defaultConfig, ...config };

  const searchParams = new URLSearchParams({
    limit: String(limit),
    page: String(page),
  });

  if (config?.fields?.length) {
    searchParams.append("fields", config.fields.join(","));
  }

  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks?${searchParams}`,
  );
  return response.json();
};

export const getImageSRC = (imageID: string) => {
  return `https://www.artic.edu/iiif/2/${imageID}/full/843,/0/default.jpg`;
};
