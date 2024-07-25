import { createBrowserRouter } from "react-router-dom";
import ArtworkList from "./features/artworks/components/ArtworkList.tsx";
import AppLayout from "./AppLayout.tsx";
import { ErrorElement } from "./ErrorElement.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorElement />,
      children: [
        {
          index: true,
          element: <ArtworkList />,
        },
      ],
    },
  ],
  { basename: "/bef8b930-832c-4d47-8425-b259f0dcf3f1" },
);

export default router;
