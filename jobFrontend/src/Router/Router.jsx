import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Postjob from "../Pages/PostJob";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        { path: "/home", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/post-job", element: <Postjob /> },
        { path: "/about", element: <About /> },
        { path: "/about", element: <About /> },
        { path: "/about", element: <About /> },
      ]
    },
]);

export default router;