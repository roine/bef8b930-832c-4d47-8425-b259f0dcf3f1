import { useParams } from "react-router-dom";
import { ArtworkResponse, getImageSRC } from "../artworksAPI.ts";
import { useArtworkDetails } from "../artworksHooks.ts";
import * as RemoteData from "../../../utils/remoteData.ts";
import Loading from "../../../components/Loading.tsx";

const fields = [
  "id",
  "title",
  "thumbnail",
  "image_id",
  "description",
  "credit_line",
  "artist_title",
] as const satisfies (keyof ArtworkResponse)[];

export const ArtworkDetail = () => {
  const { artworkID } = useParams();
  if (!artworkID) {
    // ideally show an error message or redirect to home instead
    throw new Error("Artwork ID is required");
  }

  const { artwork, refetch } = useArtworkDetails(artworkID, { fields });

  if (RemoteData.isInitial(artwork)) {
    return (
      <button
        className="btn"
        onClick={() => {
          refetch();
        }}
      >
        Fetch the artwork
      </button>
    );
  }

  if (RemoteData.isPending(artwork)) {
    return <Loading />;
  }

  if (RemoteData.isFailure(artwork)) {
    return (
      <div className="flex justify-center flex-col">
        <div>Something went wrong</div>
        <div>{artwork.error}</div>
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

  if (RemoteData.isSuccess(artwork)) {
    const details = artwork.value.data;
    return (
      <div className="flex flex-col items-center">
        {details.title && <h1 className="text-3xl mb-8">{details.title}</h1>}

        <div className="max-w-xl flex flex-col gap-4">
          {details.image_id && details.thumbnail?.alt_text && (
            <img
              src={getImageSRC(details.image_id)}
              alt={details.thumbnail.alt_text}
              className=" rounded-lg shadow-xl"
            />
          )}
          <p
            className="py-6"
            dangerouslySetInnerHTML={{ __html: details.description }}
          />
          <p>{details.artist_title}</p>
          <p>{details.credit_line}</p>
          <p>{details.provenance_text}</p>
        </div>
      </div>
    );
  }
};
