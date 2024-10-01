import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SingleCountry from "../pages/SingleCountry";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/country/:cca2",
        element: <SingleCountry />,
      },
    ],
  },
]);

export default router;
