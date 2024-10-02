import { createBrowserRouter } from "react-router-dom";
import SingleCountry from "../pages/SingleCountry";
import Error from "../pages/Error";
import Home from "../components/Main";
import App from "./../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/country/:cca2",
        element: <SingleCountry />,
      },
    ],
  },
]);

export default router;
