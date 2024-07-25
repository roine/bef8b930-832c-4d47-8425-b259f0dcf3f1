import * as RemoteData from "../../../utils/remoteData.ts";
import { getImageSRC } from "../artworksAPI.ts";
import clsx from "clsx";
import { useArtworks } from "../artworksHooks.ts";
import Loading from "../../../components/Loading.tsx";

const fields = [
  "id",
  "title",
  "thumbnail",
  "image_id",
  "description",
  "credit_line",
  "artist_title",
];

const ArtworkList = () => {
  const { artworks, refetch } = useArtworks({ fields });

  if (RemoteData.isInitial(artworks)) {
    return (
      <button
        className="btn"
        onClick={() => {
          refetch();
        }}
      >
        Fetch the latest artworks
      </button>
    );
  }

  if (RemoteData.isPending(artworks)) {
    return <Loading />;
  }

  if (RemoteData.isFailure(artworks)) {
    return (
      <div className="flex justify-center flex-col">
        <div>Something went wrong</div>
        <div>{artworks.error}</div>
        <div>
          <button
            className="btn"
            onClick={() => {
              refetch();
            }}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (RemoteData.isSuccess(artworks)) {
    const loadNextPage = () => {
      refetch({ page: artworks.value.pagination.current_page + 1 });
    };

    const loadPreviousPage = () => {
      refetch({ page: artworks.value.pagination.current_page + 1 });
    };

    return (
      <div className="flex flex-col gap-8">
        <div className="flex gap-4 flex-col">
          {artworks.value.data.map((artwork, idx) => (
            <div key={artwork.id} className="hero bg-base-200 ">
              <div
                className={clsx(
                  "hero-content  flex-col lg:flex-row",
                  idx % 2 === 0 && "lg:flex-row-reverse",
                )}
              >
                <div>
                  {artwork.image_id && artwork.thumbnail?.alt_text && (
                    <img
                      src={getImageSRC(artwork.image_id)}
                      alt={artwork.thumbnail.alt_text}
                      className="max-w-xl rounded-lg shadow-2xl"
                    />
                  )}

                  <div
                    className={clsx(
                      "flex flex-col text-xs items-center mt-1",
                      idx % 2 === 0 ? "lg:items-end" : "lg:items-start",
                    )}
                  >
                    <span>{artwork.artist_title}</span>
                    <em>{artwork.credit_line}</em>
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl font-bold">{artwork.title}</h1>
                  <p
                    className="py-6"
                    dangerouslySetInnerHTML={{ __html: artwork.description }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/*PAGINATION*/}
        <div className="flex justify-end gap-2">
          <button
            className="btn btn-circle btn-outline"
            disabled={artworks.value.pagination.current_page === 1}
            onClick={() => loadPreviousPage()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            className="btn btn-circle btn-outline"
            disabled={
              artworks.value.pagination.total_pages ===
              artworks.value.pagination.current_page
            }
            onClick={() => loadNextPage()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
};

export default ArtworkList;
