import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Posts from "./views/Posts";
import Admin from "./views/Admin";
import PostDetails from "./views/PostDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
  {
    path: "/posts/:postId",
    element: <PostDetails />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
