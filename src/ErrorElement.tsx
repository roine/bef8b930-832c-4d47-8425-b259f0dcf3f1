import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorElement = () => {
  const error = useRouteError();

  console.error(error);

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <>Page not found</>;
  }

  return <>Error while loading the page</>;
};
