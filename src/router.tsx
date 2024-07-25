import { createBrowserRouter } from "react-router-dom";
import ArtworkList from "./features/artworks/components/ArtworkList.tsx";
import AppLayout from "./AppLayout.tsx";
import { ErrorElement } from "./ErrorElement.tsx";

const router = createBrowserRouter([
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
]);

export default router;
