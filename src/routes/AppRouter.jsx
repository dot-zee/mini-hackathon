import React from "react";
import {createBrowserRouter , RouterProvider } from 'react-router'
import Counter from "../components/Counter";
import MainLayout from "../layout/MainLayout";
import Card from "../ui/Card";
import MediaSearch from "../components/MediaSearch";

const AppRouter = () => {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element:<MainLayout />,
      children: [
        {
          // index: true,
          path: "",
          element: <Card />
        },
        {
          path: 'counter',
          element:  <Counter />
        },
        {
          path: 'media',
          element:  <MediaSearch />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
};

export default AppRouter;
